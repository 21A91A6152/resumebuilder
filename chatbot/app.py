from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/', methods=['GET'])
def demo():
        return jsonify({"reply": "manoj"})
 
@app.route('/chat', methods=['POST'])
def chat():
    user_message = request.json['message']
    
     
    if "name" in user_message.lower():
        reply = "Fill basic information about you like address, email, education info, etc."
    elif "purpose" in user_message.lower():
        reply = "What is the purpose of your resume? Options: Software Developer, Higher Studies, PhD, Entrepreneur."
    elif "software developer" in user_message.lower():
        reply = "Here are some recommended courses for a Software Developer role: Data Structures & Algorithms, Full Stack Development, AWS Certification."
    else:
        reply = "I didn’t quite understand. Can you please clarify?"

    return jsonify({"reply": reply})

if __name__ == '__main__':
    app.run(debug=True, port=5001)
