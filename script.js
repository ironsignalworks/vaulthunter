        // --- DOM Elements ---
        const mainMenu = document.getElementById('main-menu');
        const gameScreen = document.getElementById('game-screen');
        const startMissionBtn = document.getElementById('start-mission-btn');
        const mainMenuBtn = document.getElementById('main-menu-btn');
        const mapContainer = document.getElementById('map-container');
        const logOutput = document.getElementById('log-output');
        const energyDisplay = document.getElementById('energy-display');
        const warheadsDisplay = document.getElementById('warheads-display');
        const geigerDisplay = document.getElementById('geiger-display');
        const intelList = document.getElementById('intel-list');
        const gameOverModal = document.getElementById('game-over-modal');
        const modalTitle = document.getElementById('modal-title');
        const modalText = document.getElementById('modal-text');
        const modalRestartBtn = document.getElementById('modal-restart-btn');
        const modalImage = document.getElementById('modal-image');
        const modalCloseBtn = document.getElementById('modal-close-btn');
        const suitGauge = document.getElementById('suit-gauge'); // New: Suit Gauge


        // Music and SFX elements
        const menuMusic = document.getElementById('menu-music');
        const gameMusic = document.getElementById('game-music');
        const signalSfx = document.getElementById('signal-sfx');
        const radiationSfx = document.getElementById('radiation-sfx');
        const radioSfx = document.getElementById('radio-sfx');
        const warheadSfx = document.getElementById('warhead-sfx');
        const gameOverMusic = document.getElementById('gameover-music');
        const victoryMusic = document.getElementById('victory-music');


        // --- Game State ---
        let gameState = {};

        const initialGameState = {
            energy: 100,
            foundWarheads: 0,
            totalWarheads: 5,
            intel: [],
            map: [],
            gameOver: false,
        };

        // --- Game Data ---
        const intelMessages = [
            { text: "KGB CIPHER: 'The Bear sleeps near the river's bend.'", image: "agent1.png" },
            { text: "CIA MEMO: 'Package delivery confirmed at grid G-7.'", image: "agent2.png" },
            { text: "STASI REPORT: 'High radiation spike detected south of the old factory.'", image: "agent3.png" },
            { text: "MI6 INTERCEPT: 'Look for the listening post disguised as a farmhouse.'", image: "agent4.png" },
            { text: "NSA DECRYPTION: 'Three steps east from the lone pine.'", image: "agent5.png" },
            { text: "FALSE LEAD: 'The prize is at A-1. Trust us. - A Friend'", image: "agent6.png" },
            { text: "FIELD NOTE: 'Energy signature strongest near the comms tower.'", image: "agent7.png" },
            { text: "SATELLITE IMAGE: 'Anomaly detected in the quarry.'", image: "agent8.png" },
            { text: "AGENT'S LOG: 'They're onto me. I hid the device where the crows gather.'", image: "agent9.png" },
            { text: "ENCRYPTED DATA: '44.5587° N, 34.0322° E... coordinates are useless without the key.'", image: "agent10.png" }
        ];

        const gameOverImage = "agent11.png"; // Game over image
        const victoryImage = "agent12.png"; // Victory image


        // --- Game Logic ---
        function initGame() {
            gameState = JSON.parse(JSON.stringify(initialGameState));
            generateMap();
            renderMap();
            updateStatus();
            logOutput.innerHTML = ''; // Clear log on new game
            logMessage("SYSTEM BOOT... WELCOME, AGENT.");
            logMessage("OBJECTIVE: LOCATE 5 NUCLEAR DEVICES.");
            logMessage("EACH ACTION COSTS ENERGY. PROCEED WITH CAUTION.");
            document.body.classList.remove('glitch-effect'); // Ensure glitch effect is off
            suitGauge.style.filter = 'brightness(100%) grayscale(0%)'; // Reset suit gauge filter
        }

        // Initial music play for menu
        document.addEventListener('DOMContentLoaded', () => {
            menuMusic.volume = 0.7;
            menuMusic.play().catch(e => console.log("Menu music autoplay failed:", e)); // Autoplay might be blocked by browsers
        });


        function generateMap() {
            gameState.map = [];
            for (let i = 0; i < 100; i++) {
                gameState.map.push({ type: 'empty', scanned: false });
            }

            // Place Warheads
            placeItems('warhead', gameState.totalWarheads);
            // Place Intel
            placeItems('intel', 10);
            // Place Radiation
            placeItems('radiation', 15);
        }

        function placeItems(type, count) {
            let placed = 0;
            const availableIntelMessages = [...intelMessages]; // Create a mutable copy
            while (placed < count) {
                const index = Math.floor(Math.random() * 100);
                if (gameState.map[index].type === 'empty') {
                    gameState.map[index].type = type;
                    if (type === 'intel') {
                           // Pick a random intel message/image and remove it so it's not reused
                           const randomIndex = Math.floor(Math.random() * availableIntelMessages.length);
                           gameState.map[index].message = availableIntelMessages[randomIndex].text;
                           gameState.map[index].image = availableIntelMessages[randomIndex].image;
                           availableIntelMessages.splice(randomIndex, 1);
                    }
                    placed++;
                }
            }
        }

        function renderMap() {
            mapContainer.innerHTML = '';
            gameState.map.forEach((zone, index) => {
                const zoneEl = document.createElement('div');
                zoneEl.classList.add('map-zone');
                zoneEl.dataset.index = index;

                if(zone.scanned){
                    zoneEl.classList.add('scanned');
                    switch(zone.type){
                        case 'radiation':
                            zoneEl.classList.add('radiation');
                            zoneEl.textContent = '☢';
                            break;
                        case 'intel':
                            zoneEl.classList.add('intel');
                            zoneEl.textContent = '📡';
                            break;
                        case 'warhead':
                            zoneEl.classList.add('warhead');
                            zoneEl.textContent = '💣';
                            break;
                        default:
                            zoneEl.textContent = '·';
                    }
                } else {
                    zoneEl.textContent = '■';
                }

                zoneEl.addEventListener('click', () => scanZone(index));
                mapContainer.appendChild(zoneEl);
            });
        }

        function scanZone(index) {
            if (gameState.gameOver || gameState.map[index].scanned) return;

            const zone = gameState.map[index];
            zone.scanned = true;

            gameState.energy -= 2; // Reduced energy cost
            if(gameState.energy < 0) gameState.energy = 0;

            let geigerReading = 0;

            switch (zone.type) {
                case 'empty':
                    logMessage(`SECTOR [${getCoords(index)}] SCAN: No significant signal.`);
                    geigerReading = Math.random() * 5;
                    signalSfx.currentTime = 0; // Rewind to start
                    signalSfx.play().catch(e => console.log("Signal SFX play failed:", e));
                    break;
                case 'radiation':
                    logMessage(`! ALERT: High radiation in SECTOR [${getCoords(index)}]. ENERGY DRAIN ACCELERATED.`);
                    gameState.energy -= 5; // Reduced additional energy cost
                    if(gameState.energy < 0) gameState.energy = 0;
                    geigerReading = 50 + Math.random() * 50;
                    radiationSfx.currentTime = 0; // Rewind to start
                    radiationSfx.play().catch(e => console.log("Radiation SFX play failed:", e));
                    break;
                case 'intel':
                    logMessage(`INTEL FOUND in SECTOR [${getCoords(index)}].`);
                    const newIntelText = zone.message;
                    const newIntelImage = zone.image;
                    gameState.intel.push({ text: newIntelText, image: newIntelImage });
                    addIntelToList(newIntelText);
                    geigerReading = 5 + Math.random() * 10;
                    radioSfx.currentTime = 0; // Rewind to start
                    radioSfx.play().catch(e => console.log("Radio SFX play failed:", e));
                    showModal("INTEL COLLECTED", newIntelText, newIntelImage); // Show modal with image
                    break;
                case 'warhead':
                    logMessage(`!!! WARHEAD DETECTED in SECTOR [${getCoords(index)}]! DEVICE SECURED.`);
                    gameState.foundWarheads++;
                    geigerReading = 100 + Math.random() * 100;
                    warheadSfx.currentTime = 0; // Rewind to start
                    warheadSfx.play().catch(e => console.log("Warhead SFX play failed:", e));
                    break;
            }

            geigerDisplay.textContent = `GEIGER: ${geigerReading.toFixed(1)} uSv/h`;

            renderMap();
            updateStatus();
            checkWinLoss();
        }

        function getCoords(index) {
            const col = String.fromCharCode(65 + (index % 10)); // A-J
            const row = Math.floor(index / 10) + 1; // 1-10
            return `${col}-${row}`;
        }

        function updateStatus() {
            energyDisplay.textContent = `ENERGY: ${gameState.energy}%`;
            warheadsDisplay.textContent = `WARHEADS FOUND: ${gameState.foundWarheads}/${gameState.totalWarheads}`;

            if(gameState.energy <= 20) {
                energyDisplay.style.color = 'red';
                document.body.classList.add('glitch-effect'); // Add glitch effect
            } else {
                energyDisplay.style.color = 'var(--text-color)';
                document.body.classList.remove('glitch-effect'); // Remove glitch effect
            }

            // Update suit gauge based on energy
            if (suitGauge) {
                let brightness = 100;
                let grayscale = 0;

                if (gameState.energy < 20) {
                    brightness = 50;
                    grayscale = 100;
                } else if (gameState.energy < 50) {
                    brightness = 75;
                    grayscale = 50;
                } else {
                    brightness = 100;
                    grayscale = 0;
                }
                suitGauge.style.filter = `brightness(${brightness}%) grayscale(${grayscale}%)`;
            }
        }

        function logMessage(message) {
            const p = document.createElement('p');
            p.classList.add('log-entry');
            logOutput.appendChild(p);

            let i = 0;
            function typeWriter() {
                if (i < message.length) {
                    p.textContent += message.charAt(i);
                    i++;
                    logOutput.scrollTop = logOutput.scrollHeight;
                    setTimeout(typeWriter, 10);
                }
            }
            typeWriter();
        }

        function addIntelToList(intelText) {
            if (gameState.intel.length === 0) { // Check if it's the first intel entry
                intelList.innerHTML = ''; // Clear "NO INTEL" message
            }
            const li = document.createElement('li');
            li.textContent = intelText;
            intelList.prepend(li);
        }

        function resetIntelList() {
            intelList.innerHTML = '<li>NO INTEL COLLECTED</li>';
        }

        function checkWinLoss() {
            if (gameState.foundWarheads === gameState.totalWarheads) {
                showModal("MISSION ACCOMPLISHED", "All warheads have been secured. Excellent work, Agent. You have averted a global catastrophe.", victoryImage, true); // Pass true for isGameOver
                gameState.gameOver = true;
                gameMusic.pause();
                gameOverMusic.pause(); // Ensure game over music is stopped
                victoryMusic.currentTime = 0; // Rewind to start
                victoryMusic.play().catch(e => console.log("Victory music play failed:", e));
            } else if (gameState.energy <= 0) {
                showModal("MISSION FAILED", "Energy systems depleted. The signal is lost. The world will have to face the consequences.", gameOverImage, true); // Pass true for isGameOver
                gameState.gameOver = true;
                gameMusic.pause();
                victoryMusic.pause(); // Ensure victory music is stopped
                gameOverMusic.currentTime = 0; // Rewind to start
                gameOverMusic.play().catch(e => console.log("Game over music play failed:", e));
            }
        }

        // Modified showModal to accept an optional image path and a flag for game over state
        function showModal(title, text, imagePath = null, isGameOver = false) {
            modalTitle.textContent = title;
            modalText.textContent = text;
            if (imagePath) {
                modalImage.src = imagePath;
                modalImage.classList.remove('hidden');
            } else {
                modalImage.classList.add('hidden');
                modalImage.src = ""; // Clear src when no image is needed
            }

            if (isGameOver) {
                modalRestartBtn.classList.remove('hidden');
                modalCloseBtn.classList.add('hidden'); // Game Over/Win screens only have restart
            } else { // It's an intel pop-up
                modalRestartBtn.classList.add('hidden');
                modalCloseBtn.classList.remove('hidden');
            }
            gameOverModal.classList.remove('hidden');
        }

        function hideModal() {
            gameOverModal.classList.add('hidden');
            modalImage.classList.add('hidden'); // Ensure image is hidden when modal closes
            modalImage.src = ""; // Clear src
            modalRestartBtn.classList.remove('hidden'); // Reset state of restart button (default for game over)
            modalCloseBtn.classList.add('hidden'); // Reset state of close button (default hidden for game over)

            // If game is over and modal is hidden, stop gameover/victory music if playing
            if (gameState.gameOver) {
                gameOverMusic.pause();
                victoryMusic.pause();
                gameOverMusic.currentTime = 0;
                victoryMusic.currentTime = 0;
            }
        }

        function showMainMenu() {
            mainMenu.classList.remove('hidden');
            gameScreen.classList.add('hidden');
            hideModal(); // Ensure modal is hidden and reset
            gameMusic.pause();
            gameOverMusic.pause(); // Stop game over music if returning to main menu
            victoryMusic.pause(); // Stop victory music if returning to main menu
            menuMusic.play().catch(e => console.log("Menu music play failed:", e));
            document.body.classList.remove('glitch-effect'); // Ensure glitch effect is off
            suitGauge.style.filter = 'brightness(100%) grayscale(0%)'; // Reset suit gauge filter
        }

        function startGame() {
            mainMenu.classList.add('hidden');
            gameScreen.classList.remove('hidden');
            resetIntelList();
            initGame();
            menuMusic.pause();
            gameOverMusic.pause(); // Stop game over music if starting a new game
            victoryMusic.pause(); // Stop victory music if starting a new game
            gameMusic.volume = 0.7;
            gameMusic.play().catch(e => console.log("Game music play failed:", e));
            hideModal(); // Hide any lingering modal from a previous game
            document.body.classList.remove('glitch-effect'); // Ensure glitch effect is off
            suitGauge.style.filter = 'brightness(100%) grayscale(0%)'; // Reset suit gauge filter
        }

        // --- Event Listeners ---
        startMissionBtn.addEventListener('click', startGame);
        mainMenuBtn.addEventListener('click', showMainMenu);
        modalRestartBtn.addEventListener('click', () => {
            hideModal();
            startGame();
        });
        modalCloseBtn.addEventListener('click', hideModal);

