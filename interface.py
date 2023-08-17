from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/make_move', methods=['POST'])
def make_move():
    data = request.json
    player = data.get('player')
    row = data.get('row')
    col = data.get('col')

    if player == 'X':
        # Call your Python function for player 'X' here
        # For example, you can print a message
        print(f"Player X made a move at ({row}, {col})")

    return jsonify({"message": "Move processed"})

if __name__ == '__main__':
    app.run(debug=True)
