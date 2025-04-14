const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const gridSize = 20;
const rows = canvas.height / gridSize;
const cols = canvas.width / gridSize;

let snake = [
  { x: 10, y: 10 },
  { x: 9, y: 10 },
  { x: 8, y: 10 }
];
let direction = { x: 1, y: 0 };
let food = randomFood();
let score = 0;
let gameOver = false;
let gamePaused = false;
let gameLoopInterval;
let currentTopic = "C++"; // Default topic

// When we have a server, we'll fetch questions instead of using this array
let questions = [];

function randomFood() {
  return {
    x: Math.floor(Math.random() * cols),
    y: Math.floor(Math.random() * rows)
  };
}

function drawSnake() {
  ctx.fillStyle = 'lime';
  snake.forEach(segment => {
    ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
  });
}

function drawFood() {
  ctx.fillStyle = 'red';
  ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
}

async function fetchQuestion() {
  try {
    const response = await fetch(`/api/quiz?topic=${encodeURIComponent(currentTopic)}`);
    if (!response.ok) {
      throw new Error('Failed to fetch question');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching question:', error);
    // Fallback question if server fetch fails
    return {
      question: `What is a common feature of ${currentTopic}?`,
      options: ["Variables", "Functions", "Classes", "All of the above"],
      answer: 3
    };
  }
}

function moveSnake() {
  const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

  if (
    head.x < 0 || head.x >= cols ||
    head.y < 0 || head.y >= rows ||
    snake.some(seg => seg.x === head.x && seg.y === head.y)
  ) {
    gameOver = true;
    clearInterval(gameLoopInterval);
    showGameOverPopup();
    return;
  }

  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    pauseGame(); // Pause the game before asking the question
    showQuestion();
    food = randomFood(); // Update food so it's not drawn under the modal
  } else {
    snake.pop();
  }
}

function gameLoop() {
  if (!gamePaused && !gameOver) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    moveSnake();
    drawSnake();
    drawFood();
    
    // Display score
    ctx.fillStyle = 'white';
    ctx.font = '20px Arial';
    ctx.fillText(`Score: ${score}`, 10, 30);
    ctx.fillText(`Topic: ${currentTopic}`, 10, 60);
  }
}

function startGameLoop() {
  gameLoopInterval = setInterval(gameLoop, 100);
}

function pauseGame() {
  gamePaused = true;
}

function resumeGame() {
  gamePaused = false;
}

async function showQuestion() {
  // Show loading indicator
  const modal = document.getElementById('questionModal');
  const overlay = document.getElementById('overlay');
  const optionsDiv = document.getElementById('options');
  
  document.getElementById('questionText').innerText = "Loading question...";
  overlay.style.display = 'block';
  modal.style.display = 'block';
  optionsDiv.innerHTML = '<div class="loading">Loading...</div>';
  
  // Fetch a question from our API
  const question = await fetchQuestion();
  
  document.getElementById('questionText').innerText = question.question;
  optionsDiv.innerHTML = '';

  question.options.forEach((opt, i) => {
    const btn = document.createElement('div');
    btn.classList.add('option');
    btn.innerText = opt;
    btn.onclick = () => {
      modal.style.display = 'none';
      overlay.style.display = 'none';

      if (i === question.answer) {
        document.getElementById('message').innerText = 'Correct!';
        document.getElementById('message').className = 'correct-message';
        setTimeout(() => {
          document.getElementById('message').innerText = '';
          document.getElementById('message').className = '';
        }, 1500);
        
        const tail = snake[snake.length - 1];
        snake.push({ x: tail.x, y: tail.y });
        score++;
      } else {
        document.getElementById('message').innerText = 'Wrong Answer!';
        document.getElementById('message').className = 'wrong-message';
        setTimeout(() => {
          document.getElementById('message').innerText = '';
          document.getElementById('message').className = '';
        }, 1500);
      }

      resumeGame(); // Resume the game after the question
    };
    optionsDiv.appendChild(btn);
  });
}

function showGameOverPopup() {
  document.getElementById('overlay').style.display = 'block';
  document.getElementById('gameOverModal').style.display = 'block';
  document.getElementById('finalScore').innerText = `Your Score: ${score}`;
}

function resetGame() {
  snake = [
    { x: 10, y: 10 },
    { x: 9, y: 10 },
    { x: 8, y: 10 }
  ];
  direction = { x: 1, y: 0 };
  food = randomFood();
  score = 0;
  gameOver = false;
  gamePaused = false;
  document.getElementById('message').innerText = '';
  document.getElementById('overlay').style.display = 'none';
  document.getElementById('gameOverModal').style.display = 'none';
  startGameLoop();
}

function changeTopic(topic) {
  currentTopic = topic;
  document.getElementById('currentTopic').innerText = topic;
}

document.getElementById('restartBtn').addEventListener('click', resetGame);

// Add event listeners for topic selection
document.addEventListener('DOMContentLoaded', () => {
  const topicSelect = document.getElementById('topicSelect');
  if (topicSelect) {
    topicSelect.addEventListener('change', (e) => {
      changeTopic(e.target.value);
    });
  }
});

document.addEventListener('keydown', e => {
  if (gamePaused) return; // Prevent direction changes while paused

  switch (e.key) {
    case 'ArrowUp':
      if (direction.y === 0) direction = { x: 0, y: -1 };
      break;
    case 'ArrowDown':
      if (direction.y === 0) direction = { x: 0, y: 1 };
      break;
    case 'ArrowLeft':
      if (direction.x === 0) direction = { x: -1, y: 0 };
      break;
    case 'ArrowRight':
      if (direction.x === 0) direction = { x: 1, y: 0 };
      break;
  }
});

startGameLoop();