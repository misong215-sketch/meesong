document.addEventListener('DOMContentLoaded', () => {
    const boardElement = document.getElementById('sudoku-board');
    const timerElement = document.getElementById('timer');
    const newGameBtn = document.getElementById('new-game-btn');
    const hintBtn = document.getElementById('hint-btn');
    const checkBtn = document.getElementById('check-btn');
    const numButtons = document.querySelectorAll('.num-btn');
    const victoryModal = document.getElementById('victory-modal');
    const finalTimeElement = document.getElementById('final-time');
    const modalNewGameBtn = document.getElementById('modal-new-game');

    let board = [];
    let solution = [];
    let selectedCell = null;
    let timer = 0;
    let timerInterval = null;

    // Initialize Game
    function initGame() {
        createBoard();
        startNewGame();
        setupEventListeners();
    }

    function createBoard() {
        boardElement.innerHTML = '';
        for (let i = 0; i < 81; i++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.index = i;
            cell.addEventListener('click', () => selectCell(cell));
            boardElement.appendChild(cell);
        }
    }

    function startNewGame() {
        timer = 0;
        clearInterval(timerInterval);
        updateTimer();
        timerInterval = setInterval(() => {
            timer++;
            updateTimer();
        }, 1000);

        generateSudoku();
        renderBoard();
        victoryModal.style.display = 'none';
    }

    function updateTimer() {
        const mins = Math.floor(timer / 60).toString().padStart(2, '0');
        const secs = (timer % 60).toString().padStart(2, '0');
        timerElement.textContent = `${mins}:${secs}`;
    }

    // Sudoku Logic (Simplified Generator)
    function generateSudoku() {
        // Base solution (shuffled)
        solution = solveSudoku(Array(81).fill(0));
        board = [...solution];
        
        // Remove cells based on difficulty (Easy: 40-45 kept)
        const cellsToRemove = 40;
        let removed = 0;
        while (removed < cellsToRemove) {
            const idx = Math.floor(Math.random() * 81);
            if (board[idx] !== 0) {
                board[idx] = 0;
                removed++;
            }
        }
    }

    function solveSudoku(grid) {
        const s = [...grid];
        function isValid(g, idx, val) {
            const row = Math.floor(idx / 9);
            const col = idx % 9;
            for (let i = 0; i < 9; i++) {
                if (g[row * 9 + i] === val || g[i * 9 + col] === val) return false;
            }
            const boxRow = Math.floor(row / 3) * 3;
            const boxCol = Math.floor(col / 3) * 3;
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    if (g[(boxRow + i) * 9 + (boxCol + j)] === val) return false;
                }
            }
            return true;
        }

        function backtrack(g) {
            for (let i = 0; i < 81; i++) {
                if (g[i] === 0) {
                    const nums = [1,2,3,4,5,6,7,8,9].sort(() => Math.random() - 0.5);
                    for (let n of nums) {
                        if (isValid(g, i, n)) {
                            g[i] = n;
                            if (backtrack(g)) return true;
                            g[i] = 0;
                        }
                    }
                    return false;
                }
            }
            return true;
        }
        backtrack(s);
        return s;
    }

    function renderBoard() {
        const cells = document.querySelectorAll('.cell');
        cells.forEach((cell, i) => {
            cell.textContent = board[i] === 0 ? '' : board[i];
            cell.className = 'cell';
            if (board[i] !== 0) cell.classList.add('given');
        });
    }

    function selectCell(cell) {
        if (selectedCell) selectedCell.classList.remove('selected');
        selectedCell = cell;
        selectedCell.classList.add('selected');
        highlightRelated(parseInt(cell.dataset.index));
    }

    function highlightRelated(idx) {
        const cells = document.querySelectorAll('.cell');
        const row = Math.floor(idx / 9);
        const col = idx % 9;
        const boxRow = Math.floor(row / 3) * 3;
        const boxCol = Math.floor(col / 3) * 3;

        cells.forEach((cell, i) => {
            cell.classList.remove('highlight');
            const r = Math.floor(i / 9);
            const c = i % 9;
            const br = Math.floor(r / 3) * 3;
            const bc = Math.floor(c / 3) * 3;

            if (r === row || c === col || (br === boxRow && bc === boxCol)) {
                cell.classList.add('highlight');
            }
        });
    }

    function handleInput(val) {
        if (!selectedCell || selectedCell.classList.contains('given')) return;
        
        const idx = parseInt(selectedCell.dataset.index);
        if (val === 'erase') {
            board[idx] = 0;
            selectedCell.textContent = '';
            selectedCell.classList.remove('user', 'error');
        } else {
            const num = parseInt(val);
            board[idx] = num;
            selectedCell.textContent = num;
            selectedCell.classList.add('user');
            selectedCell.classList.remove('error');
            
            if (checkWin()) {
                endGame();
            }
        }
    }

    function checkWin() {
        if (board.includes(0)) return false;
        for (let i = 0; i < 81; i++) {
            if (board[i] !== solution[i]) return false;
        }
        return true;
    }

    function endGame() {
        clearInterval(timerInterval);
        finalTimeElement.textContent = timerElement.textContent;
        victoryModal.style.display = 'flex';
    }

    function setupEventListeners() {
        numButtons.forEach(btn => {
            btn.addEventListener('click', () => handleInput(btn.dataset.value));
        });

        document.addEventListener('keydown', (e) => {
            if (e.key >= '1' && e.key <= '9') handleInput(e.key);
            if (e.key === 'Backspace' || e.key === 'Delete') handleInput('erase');
        });

        newGameBtn.addEventListener('click', startNewGame);
        modalNewGameBtn.addEventListener('click', startNewGame);

        hintBtn.addEventListener('click', () => {
            if (!selectedCell || selectedCell.textContent !== '') return;
            const idx = parseInt(selectedCell.dataset.index);
            handleInput(solution[idx].toString());
        });

        checkBtn.addEventListener('click', () => {
            const cells = document.querySelectorAll('.cell');
            cells.forEach((cell, i) => {
                if (board[i] !== 0 && !cell.classList.contains('given')) {
                    if (board[i] !== solution[i]) {
                        cell.classList.add('error');
                    } else {
                        cell.classList.remove('error');
                    }
                }
            });
        });
    }

    initGame();
});
