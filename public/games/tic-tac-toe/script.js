document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const cells = document.querySelectorAll('.cell');
    const status = document.querySelector('.status');
    const restartBtn = document.getElementById('restartBtn');
    const questionModal = document.getElementById('questionModal');
    const questionText = document.getElementById('questionText');
    const questionImage = document.getElementById('questionImage');
    const optionsContainer = document.getElementById('optionsContainer');
    const submitAnswer = document.getElementById('submitAnswer');
    
    let currentPlayer = 'X'; // User is X, AI is O
    let gameActive = true;
    let gameState = ['', '', '', '', '', '', '', '', ''];
    let currentCellIndex = null;
    let selectedOption = null;
    
    // Questions database with MCQ format
    const questions = [
        {
            image: 'https://via.placeholder.com/500x300?text=Math+Question',
            text: 'What is 5 + 7?',
            options: ['10', '11', '12', '13'],
            correct: 2
        },
        {
            image: 'https://via.placeholder.com/500x300?text=Capital+Question',
            text: 'What is the capital of France?',
            options: ['London', 'Berlin', 'Madrid', 'Paris'],
            correct: 3
        },
        {
            image: 'https://via.placeholder.com/500x300?text=Science+Question',
            text: 'How many planets are in our solar system?',
            options: ['7', '8', '9', '10'],
            correct: 1
        },
        {
            image: 'https://via.placeholder.com/500x300?text=Animal+Question',
            text: 'What is the largest mammal on Earth?',
            options: ['Elephant', 'Blue Whale', 'Giraffe', 'Polar Bear'],
            correct: 1
        },
        {
            image: 'https://via.placeholder.com/500x300?text=Color+Question',
            text: 'What color do you get when you mix red and blue?',
            options: ['Green', 'Orange', 'Purple', 'Yellow'],
            correct: 2
        },
        {
            image: 'https://via.placeholder.com/500x300?text=History+Question',
            text: 'Who was the first president of the United States?',
            options: ['Thomas Jefferson', 'John Adams', 'George Washington', 'Abraham Lincoln'],
            correct: 2
        }
    ];
    
    // Winning conditions
    const winningConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6]             // diagonals
    ];
    
    // Initialize the game
    function initGame() {
        currentPlayer = 'X';
        gameActive = true;
        gameState = ['', '', '', '', '', '', '', '', ''];
        status.textContent = 'Your turn (X)';
        
        cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('x', 'o');
            cell.addEventListener('click', handleCellClick);
        });
    }
    
    // Handle cell click
    function handleCellClick(e) {
        if (!gameActive || currentPlayer !== 'X') return;
        
        const clickedCell = e.target;
        const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));
        
        // If cell is already filled, return
        if (gameState[clickedCellIndex] !== '') return;
        
        // Save the clicked cell index and show question
        currentCellIndex = clickedCellIndex;
        showRandomQuestion();
    }
    
    // Show a random question
    function showRandomQuestion() {
        if (!gameActive) return;
        
        const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
        questionImage.src = randomQuestion.image;
        questionText.textContent = randomQuestion.text;
        
        // Clear previous options
        optionsContainer.innerHTML = '';
        selectedOption = null;
        submitAnswer.disabled = true;
        
        // Add new options
        randomQuestion.options.forEach((option, index) => {
            const optionElement = document.createElement('div');
            optionElement.className = 'option';
            optionElement.textContent = option;
            optionElement.dataset.index = index;
            
            optionElement.addEventListener('click', () => {
                // Remove selected class from all options
                document.querySelectorAll('.option').forEach(opt => {
                    opt.classList.remove('selected');
                });
                
                // Add selected class to clicked option
                optionElement.classList.add('selected');
                selectedOption = index;
                submitAnswer.disabled = false;
            });
            
            optionsContainer.appendChild(optionElement);
        });
        
        questionModal.style.display = 'flex';
    }
    
    // Handle answer submission
    submitAnswer.addEventListener('click', () => {
        const currentQuestion = questions.find(q => q.text === questionText.textContent);
        
        if (selectedOption === currentQuestion.correct) {
            // Correct answer - proceed with the move
            questionModal.style.display = 'none';
            makeMove(currentCellIndex, 'X');
            
            // AI makes a move after a short delay
            if (gameActive) {
                setTimeout(() => {
                    aiMove();
                }, 800);
            }
        } else {
            // Wrong answer - miss the turn
            questionModal.style.display = 'none';
            status.textContent = 'Wrong answer! AI gets a turn.';
            
            // AI makes a move after a short delay
            setTimeout(() => {
                aiMove();
            }, 1500);
        }
    });
    
    // Make the move after correct answer
    function makeMove(cellIndex, player) {
        gameState[cellIndex] = player;
        cells[cellIndex].textContent = player;
        cells[cellIndex].classList.add(player.toLowerCase());
        
        checkResult();
    }
    
    // AI makes a move
    function aiMove() {
        if (!gameActive || currentPlayer !== 'O') return;
        
        // Simple AI - first tries to win, then blocks, then random
        let move = findWinningMove('O') || findWinningMove('X') || findRandomMove();
        
        if (move !== null) {
            makeMove(move, 'O');
        }
    }
    
    // Find a winning move for the specified player
    function findWinningMove(player) {
        for (let condition of winningConditions) {
            const [a, b, c] = condition;
            
            // Check if two in a row with one empty
            if (gameState[a] === player && gameState[b] === player && gameState[c] === '') return c;
            if (gameState[a] === player && gameState[c] === player && gameState[b] === '') return b;
            if (gameState[b] === player && gameState[c] === player && gameState[a] === '') return a;
        }
        return null;
    }
    
    // Find a random available move
    function findRandomMove() {
        const availableMoves = [];
        for (let i = 0; i < gameState.length; i++) {
            if (gameState[i] === '') {
                availableMoves.push(i);
            }
        }
        return availableMoves.length > 0 ? 
            availableMoves[Math.floor(Math.random() * availableMoves.length)] : null;
    }
    
    // Check for win or draw
    function checkResult() {
        let roundWon = false;
        
        for (let i = 0; i < winningConditions.length; i++) {
            const [a, b, c] = winningConditions[i];
            
            if (gameState[a] === '' || gameState[b] === '' || gameState[c] === '') {
                continue;
            }
            
            if (gameState[a] === gameState[b] && gameState[b] === gameState[c]) {
                roundWon = true;
                break;
            }
        }
        
        if (roundWon) {
            const winner = currentPlayer === 'X' ? 'You' : 'AI';
            status.textContent = `${winner} win!`;
            gameActive = false;
            return;
        }
        
        // Check for draw
        if (!gameState.includes('')) {
            status.textContent = 'Game ended in a draw!';
            gameActive = false;
            return;
        }
        
        // Change player
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        status.textContent = currentPlayer === 'X' ? 'Your turn (X)' : 'AI is thinking...';
    }
    
    // Restart game
    restartBtn.addEventListener('click', initGame);
    
    // Initialize the game
    initGame();
});