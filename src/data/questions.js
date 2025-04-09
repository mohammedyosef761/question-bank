// Mock questions data (100 questions)
const questions = [
  {
    id: 1,
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correctAnswer: "Paris"
  },
  {
    id: 2,
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Venus"],
    correctAnswer: "Mars"
  },
  {
    id: 3,
    question: "What is 2 + 2?",
    options: ["3", "4", "5", "6"],
    correctAnswer: "4"
  },
  {
    id: 4,
    question: "Who wrote 'Romeo and Juliet'?",
    options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
    correctAnswer: "William Shakespeare"
  },
  {
    id: 5,
    question: "What is the chemical symbol for gold?",
    options: ["Go", "Gd", "Au", "Ag"],
    correctAnswer: "Au"
  },
  {
    id: 6,
    question: "Which country is known as the Land of the Rising Sun?",
    options: ["China", "Korea", "Japan", "Thailand"],
    correctAnswer: "Japan"
  },
  {
    id: 7,
    question: "What is the largest ocean on Earth?",
    options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
    correctAnswer: "Pacific Ocean"
  },
  {
    id: 8,
    question: "Who painted the Mona Lisa?",
    options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
    correctAnswer: "Leonardo da Vinci"
  },
  {
    id: 9,
    question: "What is the square root of 64?",
    options: ["6", "7", "8", "9"],
    correctAnswer: "8"
  },
  {
    id: 10,
    question: "Which element has the chemical symbol 'O'?",
    options: ["Osmium", "Oxygen", "Oganesson", "Olivine"],
    correctAnswer: "Oxygen"
  },
  // Questions 11-20
  {
    id: 11,
    question: "Who was the first person to step on the moon?",
    options: ["Buzz Aldrin", "Neil Armstrong", "Yuri Gagarin", "John Glenn"],
    correctAnswer: "Neil Armstrong"
  },
  {
    id: 12,
    question: "What is the largest mammal on Earth?",
    options: ["Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
    correctAnswer: "Blue Whale"
  },
  {
    id: 13,
    question: "Which country is home to the Great Barrier Reef?",
    options: ["Brazil", "Australia", "Indonesia", "Mexico"],
    correctAnswer: "Australia"
  },
  {
    id: 14,
    question: "What is the smallest prime number?",
    options: ["0", "1", "2", "3"],
    correctAnswer: "2"
  },
  {
    id: 15,
    question: "Who discovered penicillin?",
    options: ["Alexander Fleming", "Marie Curie", "Louis Pasteur", "Robert Koch"],
    correctAnswer: "Alexander Fleming"
  },
  {
    id: 16,
    question: "What is the capital of Japan?",
    options: ["Seoul", "Beijing", "Tokyo", "Bangkok"],
    correctAnswer: "Tokyo"
  },
  {
    id: 17,
    question: "Which planet has the most moons?",
    options: ["Jupiter", "Saturn", "Uranus", "Neptune"],
    correctAnswer: "Saturn"
  },
  {
    id: 18,
    question: "What is the hardest natural substance on Earth?",
    options: ["Gold", "Iron", "Diamond", "Platinum"],
    correctAnswer: "Diamond"
  },
  {
    id: 19,
    question: "Who wrote 'To Kill a Mockingbird'?",
    options: ["J.K. Rowling", "Harper Lee", "Stephen King", "Ernest Hemingway"],
    correctAnswer: "Harper Lee"
  },
  {
    id: 20,
    question: "What is the main component of the Sun?",
    options: ["Oxygen", "Carbon", "Helium", "Hydrogen"],
    correctAnswer: "Hydrogen"
  },
  // Questions 21-30
  {
    id: 21,
    question: "Which country is known for the Taj Mahal?",
    options: ["India", "Egypt", "Turkey", "Morocco"],
    correctAnswer: "India"
  },
  {
    id: 22,
    question: "What is the capital of Canada?",
    options: ["Toronto", "Vancouver", "Montreal", "Ottawa"],
    correctAnswer: "Ottawa"
  },
  {
    id: 23,
    question: "Who invented the telephone?",
    options: ["Thomas Edison", "Nikola Tesla", "Alexander Graham Bell", "Guglielmo Marconi"],
    correctAnswer: "Alexander Graham Bell"
  },
  {
    id: 24,
    question: "What is the largest desert in the world?",
    options: ["Sahara Desert", "Gobi Desert", "Antarctic Desert", "Arabian Desert"],
    correctAnswer: "Antarctic Desert"
  },
  {
    id: 25,
    question: "Which element has the atomic number 1?",
    options: ["Helium", "Hydrogen", "Lithium", "Carbon"],
    correctAnswer: "Hydrogen"
  },
  {
    id: 26,
    question: "What is the currency of Japan?",
    options: ["Yuan", "Won", "Yen", "Ringgit"],
    correctAnswer: "Yen"
  },
  {
    id: 27,
    question: "Who painted 'Starry Night'?",
    options: ["Claude Monet", "Salvador Dali", "Vincent van Gogh", "Pablo Picasso"],
    correctAnswer: "Vincent van Gogh"
  },
  {
    id: 28,
    question: "What is the boiling point of water in Celsius?",
    options: ["90°C", "100°C", "110°C", "120°C"],
    correctAnswer: "100°C"
  },
  {
    id: 29,
    question: "Which planet is closest to the Sun?",
    options: ["Venus", "Earth", "Mars", "Mercury"],
    correctAnswer: "Mercury"
  },
  {
    id: 30,
    question: "Who wrote 'Pride and Prejudice'?",
    options: ["Charlotte Brontë", "Jane Austen", "Emily Brontë", "Virginia Woolf"],
    correctAnswer: "Jane Austen"
  },
  // Continue with more questions...
  // Questions 31-40
  {
    id: 31,
    question: "What is the largest organ in the human body?",
    options: ["Heart", "Liver", "Skin", "Brain"],
    correctAnswer: "Skin"
  },
  {
    id: 32,
    question: "Which country is known for the Great Wall?",
    options: ["Japan", "China", "Mongolia", "Russia"],
    correctAnswer: "China"
  },
  {
    id: 33,
    question: "What is the chemical symbol for silver?",
    options: ["Si", "Sv", "Sl", "Ag"],
    correctAnswer: "Ag"
  },
  {
    id: 34,
    question: "Who discovered gravity?",
    options: ["Albert Einstein", "Galileo Galilei", "Isaac Newton", "Nikola Tesla"],
    correctAnswer: "Isaac Newton"
  },
  {
    id: 35,
    question: "What is the capital of Brazil?",
    options: ["Rio de Janeiro", "São Paulo", "Brasília", "Salvador"],
    correctAnswer: "Brasília"
  },
  {
    id: 36,
    question: "Which is the smallest continent?",
    options: ["Europe", "Australia", "Antarctica", "South America"],
    correctAnswer: "Australia"
  },
  {
    id: 37,
    question: "What is the freezing point of water in Fahrenheit?",
    options: ["0°F", "32°F", "100°F", "-32°F"],
    correctAnswer: "32°F"
  },
  {
    id: 38,
    question: "Who is known as the father of computers?",
    options: ["Bill Gates", "Steve Jobs", "Charles Babbage", "Alan Turing"],
    correctAnswer: "Charles Babbage"
  },
  {
    id: 39,
    question: "What is the largest bird in the world?",
    options: ["Eagle", "Ostrich", "Albatross", "Condor"],
    correctAnswer: "Ostrich"
  },
  {
    id: 40,
    question: "Which planet has the Great Red Spot?",
    options: ["Mars", "Venus", "Jupiter", "Saturn"],
    correctAnswer: "Jupiter"
  },
  // Questions 41-50
  {
    id: 41,
    question: "What is the capital of Australia?",
    options: ["Sydney", "Melbourne", "Canberra", "Perth"],
    correctAnswer: "Canberra"
  },
  {
    id: 42,
    question: "Who wrote 'The Great Gatsby'?",
    options: ["F. Scott Fitzgerald", "Ernest Hemingway", "Mark Twain", "John Steinbeck"],
    correctAnswer: "F. Scott Fitzgerald"
  },
  {
    id: 43,
    question: "What is the chemical symbol for iron?",
    options: ["Ir", "Fe", "In", "I"],
    correctAnswer: "Fe"
  },
  {
    id: 44,
    question: "Which country is known for the pyramids of Giza?",
    options: ["Mexico", "Peru", "Egypt", "Greece"],
    correctAnswer: "Egypt"
  },
  {
    id: 45,
    question: "What is the largest planet in our solar system?",
    options: ["Earth", "Saturn", "Jupiter", "Neptune"],
    correctAnswer: "Jupiter"
  },
  {
    id: 46,
    question: "Who painted the Sistine Chapel ceiling?",
    options: ["Leonardo da Vinci", "Raphael", "Michelangelo", "Donatello"],
    correctAnswer: "Michelangelo"
  },
  {
    id: 47,
    question: "What is the capital of Russia?",
    options: ["St. Petersburg", "Moscow", "Kiev", "Minsk"],
    correctAnswer: "Moscow"
  },
  {
    id: 48,
    question: "Which element has the chemical symbol 'Na'?",
    options: ["Nitrogen", "Neon", "Nickel", "Sodium"],
    correctAnswer: "Sodium"
  },
  {
    id: 49,
    question: "Who discovered electricity?",
    options: ["Thomas Edison", "Benjamin Franklin", "Nikola Tesla", "Michael Faraday"],
    correctAnswer: "Benjamin Franklin"
  },
  {
    id: 50,
    question: "What is the smallest bone in the human body?",
    options: ["Stapes", "Femur", "Radius", "Tibia"],
    correctAnswer: "Stapes"
  },
  // Questions 51-60
  {
    id: 51,
    question: "What is the capital of Italy?",
    options: ["Venice", "Milan", "Rome", "Naples"],
    correctAnswer: "Rome"
  },
  {
    id: 52,
    question: "Which gas do plants absorb from the atmosphere?",
    options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
    correctAnswer: "Carbon Dioxide"
  },
  {
    id: 53,
    question: "Who wrote 'War and Peace'?",
    options: ["Fyodor Dostoevsky", "Leo Tolstoy", "Anton Chekhov", "Ivan Turgenev"],
    correctAnswer: "Leo Tolstoy"
  },
  {
    id: 54,
    question: "What is the chemical symbol for potassium?",
    options: ["Po", "Pt", "K", "P"],
    correctAnswer: "K"
  },
  {
    id: 55,
    question: "Which is the longest river in the world?",
    options: ["Amazon", "Nile", "Mississippi", "Yangtze"],
    correctAnswer: "Nile"
  },
  {
    id: 56,
    question: "Who developed the theory of relativity?",
    options: ["Isaac Newton", "Niels Bohr", "Albert Einstein", "Stephen Hawking"],
    correctAnswer: "Albert Einstein"
  },
  {
    id: 57,
    question: "What is the capital of Spain?",
    options: ["Barcelona", "Madrid", "Seville", "Valencia"],
    correctAnswer: "Madrid"
  },
  {
    id: 58,
    question: "Which planet is known as the 'Morning Star'?",
    options: ["Mars", "Venus", "Mercury", "Jupiter"],
    correctAnswer: "Venus"
  },
  {
    id: 59,
    question: "Who invented the light bulb?",
    options: ["Thomas Edison", "Nikola Tesla", "Alexander Graham Bell", "James Watt"],
    correctAnswer: "Thomas Edison"
  },
  {
    id: 60,
    question: "What is the largest species of shark?",
    options: ["Great White Shark", "Hammerhead Shark", "Whale Shark", "Tiger Shark"],
    correctAnswer: "Whale Shark"
  },
  // Questions 61-70
  {
    id: 61,
    question: "What is the capital of Germany?",
    options: ["Munich", "Hamburg", "Berlin", "Frankfurt"],
    correctAnswer: "Berlin"
  },
  {
    id: 62,
    question: "Which element has the chemical symbol 'Ca'?",
    options: ["Carbon", "Calcium", "Cadmium", "Californium"],
    correctAnswer: "Calcium"
  },
  {
    id: 63,
    question: "Who wrote 'Hamlet'?",
    options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
    correctAnswer: "William Shakespeare"
  },
  {
    id: 64,
    question: "What is the tallest mountain in the world?",
    options: ["K2", "Mount Everest", "Kangchenjunga", "Makalu"],
    correctAnswer: "Mount Everest"
  },
  {
    id: 65,
    question: "Which gas makes up the majority of Earth's atmosphere?",
    options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Argon"],
    correctAnswer: "Nitrogen"
  },
  {
    id: 66,
    question: "Who painted 'The Last Supper'?",
    options: ["Michelangelo", "Leonardo da Vinci", "Raphael", "Botticelli"],
    correctAnswer: "Leonardo da Vinci"
  },
  {
    id: 67,
    question: "What is the capital of China?",
    options: ["Shanghai", "Hong Kong", "Beijing", "Guangzhou"],
    correctAnswer: "Beijing"
  },
  {
    id: 68,
    question: "Which planet has rings?",
    options: ["Jupiter", "Saturn", "Uranus", "Neptune"],
    correctAnswer: "Saturn"
  },
  {
    id: 69,
    question: "Who discovered penicillin?",
    options: ["Alexander Fleming", "Marie Curie", "Louis Pasteur", "Robert Koch"],
    correctAnswer: "Alexander Fleming"
  },
  {
    id: 70,
    question: "What is the largest cat species?",
    options: ["Lion", "Tiger", "Jaguar", "Leopard"],
    correctAnswer: "Tiger"
  },
  // Questions 71-80
  {
    id: 71,
    question: "What is the capital of South Korea?",
    options: ["Busan", "Seoul", "Incheon", "Daegu"],
    correctAnswer: "Seoul"
  },
  {
    id: 72,
    question: "Which element has the chemical symbol 'Hg'?",
    options: ["Hydrogen", "Helium", "Hafnium", "Mercury"],
    correctAnswer: "Mercury"
  },
  {
    id: 73,
    question: "Who wrote '1984'?",
    options: ["George Orwell", "Aldous Huxley", "Ray Bradbury", "H.G. Wells"],
    correctAnswer: "George Orwell"
  },
  {
    id: 74,
    question: "What is the deepest ocean in the world?",
    options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
    correctAnswer: "Pacific Ocean"
  },
  {
    id: 75,
    question: "Which gas do humans exhale?",
    options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
    correctAnswer: "Carbon Dioxide"
  },
  {
    id: 76,
    question: "Who composed 'The Four Seasons'?",
    options: ["Johann Sebastian Bach", "Wolfgang Amadeus Mozart", "Ludwig van Beethoven", "Antonio Vivaldi"],
    correctAnswer: "Antonio Vivaldi"
  },
  {
    id: 77,
    question: "What is the capital of Mexico?",
    options: ["Guadalajara", "Mexico City", "Monterrey", "Cancun"],
    correctAnswer: "Mexico City"
  },
  {
    id: 78,
    question: "Which planet is known as the 'Evening Star'?",
    options: ["Mars", "Venus", "Mercury", "Jupiter"],
    correctAnswer: "Venus"
  },
  {
    id: 79,
    question: "Who invented the World Wide Web?",
    options: ["Bill Gates", "Steve Jobs", "Tim Berners-Lee", "Mark Zuckerberg"],
    correctAnswer: "Tim Berners-Lee"
  },
  {
    id: 80,
    question: "What is the fastest land animal?",
    options: ["Lion", "Cheetah", "Gazelle", "Leopard"],
    correctAnswer: "Cheetah"
  },
  // Questions 81-90
  {
    id: 81,
    question: "What is the capital of Egypt?",
    options: ["Alexandria", "Cairo", "Luxor", "Giza"],
    correctAnswer: "Cairo"
  },
  {
    id: 82,
    question: "Which element has the chemical symbol 'Pb'?",
    options: ["Phosphorus", "Platinum", "Plutonium", "Lead"],
    correctAnswer: "Lead"
  },
  {
    id: 83,
    question: "Who wrote 'The Odyssey'?",
    options: ["Socrates", "Plato", "Homer", "Aristotle"],
    correctAnswer: "Homer"
  },
  {
    id: 84,
    question: "What is the largest waterfall in the world by volume?",
    options: ["Niagara Falls", "Victoria Falls", "Angel Falls", "Iguazu Falls"],
    correctAnswer: "Victoria Falls"
  },
  {
    id: 85,
    question: "Which gas is used in balloons to make them float?",
    options: ["Oxygen", "Nitrogen", "Helium", "Hydrogen"],
    correctAnswer: "Helium"
  },
  {
    id: 86,
    question: "Who painted 'The Scream'?",
    options: ["Vincent van Gogh", "Edvard Munch", "Pablo Picasso", "Claude Monet"],
    correctAnswer: "Edvard Munch"
  },
  {
    id: 87,
    question: "What is the capital of Argentina?",
    options: ["Santiago", "Lima", "Buenos Aires", "Montevideo"],
    correctAnswer: "Buenos Aires"
  },
  {
    id: 88,
    question: "Which planet takes the longest to orbit the Sun?",
    options: ["Jupiter", "Saturn", "Uranus", "Neptune"],
    correctAnswer: "Neptune"
  },
  {
    id: 89,
    question: "Who discovered the theory of evolution by natural selection?",
    options: ["Gregor Mendel", "Charles Darwin", "Louis Pasteur", "Alexander Fleming"],
    correctAnswer: "Charles Darwin"
  },
  {
    id: 90,
    question: "What is the largest species of penguin?",
    options: ["King Penguin", "Emperor Penguin", "Gentoo Penguin", "Adelie Penguin"],
    correctAnswer: "Emperor Penguin"
  },
  // Questions 91-100
  {
    id: 91,
    question: "What is the capital of Turkey?",
    options: ["Istanbul", "Ankara", "Izmir", "Antalya"],
    correctAnswer: "Ankara"
  },
  {
    id: 92,
    question: "Which element has the chemical symbol 'Cu'?",
    options: ["Carbon", "Cobalt", "Copper", "Calcium"],
    correctAnswer: "Copper"
  },
  {
    id: 93,
    question: "Who wrote 'Don Quixote'?",
    options: ["Miguel de Cervantes", "Gabriel García Márquez", "Jorge Luis Borges", "Pablo Neruda"],
    correctAnswer: "Miguel de Cervantes"
  },
  {
    id: 94,
    question: "What is the highest mountain in Africa?",
    options: ["Mount Kenya", "Mount Kilimanjaro", "Atlas Mountains", "Mount Meru"],
    correctAnswer: "Mount Kilimanjaro"
  },
  {
    id: 95,
    question: "Which gas is responsible for the greenhouse effect?",
    options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
    correctAnswer: "Carbon Dioxide"
  },
  {
    id: 96,
    question: "Who composed 'Moonlight Sonata'?",
    options: ["Johann Sebastian Bach", "Wolfgang Amadeus Mozart", "Ludwig van Beethoven", "Franz Schubert"],
    correctAnswer: "Ludwig van Beethoven"
  },
  {
    id: 97,
    question: "What is the capital of India?",
    options: ["Mumbai", "New Delhi", "Kolkata", "Chennai"],
    correctAnswer: "New Delhi"
  },
  {
    id: 98,
    question: "Which planet is known as the 'Blue Planet'?",
    options: ["Mars", "Venus", "Earth", "Neptune"],
    correctAnswer: "Earth"
  },
  {
    id: 99,
    question: "Who invented the telephone?",
    options: ["Thomas Edison", "Alexander Graham Bell", "Nikola Tesla", "Guglielmo Marconi"],
    correctAnswer: "Alexander Graham Bell"
  },
  {
    id: 100,
    question: "What is the largest species of bear?",
    options: ["Grizzly Bear", "Polar Bear", "Brown Bear", "Black Bear"],
    correctAnswer: "Polar Bear"
  }
];

export default questions;
