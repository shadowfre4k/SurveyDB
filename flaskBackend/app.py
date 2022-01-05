import os
import boto3
import uuid
from flask_cors import CORS

from flask import Flask, jsonify, request
app = Flask(__name__)


CORS(app)

FOOD_TABLE = os.environ['FOOD_TABLE']
client = boto3.client('dynamodb')


@app.route("/")
def hello():
    return "Hello World!"


@app.route("/food-survey/<string:user_name>")
def get_user(food_type):
    resp = client.get_item(
        TableName=FOOD_TABLE,
        Key={
            'foodType': {'S': food_type}
        }
    )

    item = resp.get('Item')

    if not item:
        return jsonify({'error': 'User does not exist'}), 404

    return jsonify({
        'foodType': item.get('foodType').get('S'),
        'recommend': item.get('recommend').get('S'),
        'rating': item.get('rating').get('S'),
    })


@app.route("/food-survey", methods=["POST"])
def create_user():

    user_name = str(uuid.uuid4())
    food_type = request.json.get('foodType')
    recommend_ = request.json.get('recommend')
    rating_ = request.json.get('rating')

    if not food_type or not recommend_ or not rating_:
        return jsonify({'error': 'Please provide all information'}), 400

    resp = client.put_item(
        TableName=FOOD_TABLE,
        Item={
            'userName': {"S": user_name},
            'foodType': {"S": food_type},
            'recommend': {'S': recommend_},
            'rating': {'S': rating_}
        }
    )

    return jsonify({
        'name': {"S": user_name},
        'foodType': {'S': food_type},
        'recommend': {'S': recommend_},
        'rating': {'S': rating_}
    }
    )


@app.route("/test", methods=["GET"])
def query_food():

    table_name = "survey-table-dev-2"
    region_name = "us-west-1"

    # create resource
    resource = boto3.resource('dynamodb', region_name=region_name)

    # assign table
    target_table = resource.Table(table_name)

    result = target_table.query(
        KeyConditionExpression=Key('userName').eq(
            'b2bdc825-745a-4f18-982b-5cda8c713209') & Key('foodType').eq('Thai'),  # query against the table
        Limit=120
    )

    result["Items"]  
    return(result)


@app.route("/test2", methods=["GET"])
def scan_food():
    table_name = "survey-table-dev-2"
    region_name = "us-west-1"
    resource = boto3.resource('dynamodb', region_name=region_name)

    
    target_table = resource.Table(table_name)

    resp = target_table.scan(
        ProjectionExpression="foodType, recommend, rating")
    return resp
