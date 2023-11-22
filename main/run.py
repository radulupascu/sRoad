from flask import Flask, request, jsonify
from flask_cors import CORS

# Replace 'chatbot' with the name of your Python file containing the chatbot logic
from main import similarity_search, get_gpt_response_content, parse_gpt_response

app = Flask(__name__)
cors = CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

# Endpoint for the chat functionality
@app.route('/chat', methods=['POST', "GET"])
def chat():
    data = request.json
    user_message = data.get("message")
    if request.method == 'POST':
        try:
            # Integrate with your existing chatbot logic
            chat_log = []
            context = similarity_search(user_message, k=2)

            # You can modify this template as needed
            template = """
                ### Instruction: You're a helpful teacher that recommends a path consisting of at 5 - 7 learning resourses with 
                links and descriptions for learning cybersecurity based on relevancy and difficulty of the course in ascending order. 
                Use only chat history, the following information {context} and if you need, generate an infomative 
                description or paraphrase the existing one. If the information is not relevant you can add from your own knowledge.
                Answer in a constructive manner and don't respond unless it's about cybersecurity. If its not about cybersecurity 
                say that you cant respornd to that, be strict but compassionate.
                Format the response as follows: ** Course name ** \\n ** difficulty ** \\n ** description ** \\n ** [link] **.
                ### Question: {question}
                ### Response:
            """.strip().format(context=context, question=user_message)
    
            chat_log.append({"role": "system", "content": template})

            # Get the response from GPT
            assistant_response = get_gpt_response_content(chat_log)

            # Parse and return the response
            parsed_response = parse_gpt_response(assistant_response)
            return jsonify({"response": parsed_response})
        except Exception as e:
            return jsonify({"error": str(e)}), 500



    if not user_message:
        return jsonify({"error": "No message provided"}), 400

    

if __name__ == '__main__':
    app.run(debug=True, port=8008)