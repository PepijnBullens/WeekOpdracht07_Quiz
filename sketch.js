//canvas height and width
const canvasWidth = 800;
const canvasHeight = 600;

//god of war font
let gowFont;

//check what scene is active
let currentScene = 0;
//play qeustion scene start once
let doQuestionStartOnce = false;
//check to display question scene
let displayQuestion = true;

/* timer variables */
let drawTimer = true;
let timer = 360;
const timerSpeed = 4;

//check: 0 == no result, 1 == win, 2 == lose
let winState = 0;

//check if you can guess
let canGuess = true;

/* button variables */
let createButtonsOnce = false;
let buttons = [];

/* question, 4x answers, right answer */
let questions = 
[
  [
    "Why is Kratos so pale?",
    "he is allergic to sunlight",
    "he is a gamer",
    "He is covered in his dead families ashes",
    "he was locked away for 10 years",
    "3"
  ],
  [
    "What is the name of Kratos' first wife?",
    "Calliope",
    "Selene",
    "Lysandra",
    "Faye",
    "3"
  ],
  [
    "The Greek God of War games are narrated by which character?",
    "Athena",
    "Calliope",
    "Lysandra",
    "Gaia",
    "4"
  ],
  [
    "Why does Kratos have that red body tattoo?",
    "It's symbolic of his younger brother, Deimos",
    "It's a tradition in his family",
    "He just thought it would look cool",
    "It was bound to him at the same time as the ashes",
    "1"
  ],
  [
    "In God of War 2, Kratos' father is revealed. Who is it?",
    "Cronos",
    "Zeus",
    "Ares",
    "Apollo",
    "2"
  ],
  [
    "Who was game director on God of War 3?",
    "Cory Barlog",
    "Ru Weerasuriya",
    "Stig Asmussen",
    "David Jaffe",
    "3"
  ],
  [
    "Who is the first Greek god to die in God of War 3?",
    "Hercules",
    "Helios",
    "Poseidon",
    "Hades",
    "3"
  ],
  [
    "Which is the only God of War game to feature multiplayer?",
    "God of War 3",
    "God of War: Ascension",
    "God of War (2018)",
    "God of War: Ghost of Sparta",
    "2"
  ],
  [
    "In God of War (2018), Kratos wields an entirely different weapon. What is it called?",
    "Spartan Axe",
    "Leviathan Axe",
    "Axe of Chaos",
    "Axe of the Ghost",
    "2"
  ],
  [
    "When Kratos' son Atreus finds out he's a god, what does he say in response?",
    "Will I live forever?",
    "Can I fly?",
    "Can I turn invisible?",
    "Can I turn into an animal?",
    "4"
  ]
];

/* array of images */
let images = [];

//function preload called right before setup
function preload() {

  //load mask image
  mask = loadImage("assets/image/mask.png");

  //load images
  for (let i = 0; i < 10; i++) 
  {
    images[i] = loadImage(`assets/image/${i}.png`);
  }
}

//function setup called at start of program
function setup() {
  //create canvas
  createCanvas(canvasWidth, canvasHeight);

  //load god of war font
  gowFont = loadFont("assets/fonts/godofwar/GODOFWAR.TTF");

  //create answer buttons in button array
  for(let i = 0; i < 4; i++)
  {
    buttons[i] = createButton('temp');
    buttons[i].size(200, 150);
    buttons[i].style('font-family: godOfWarFont; border-radius: 25px; border-width: 4px; font-size: 20px;');
    buttons[i].mousePressed(function() {checkAnswer(i);});
  }

  //create start button
  startButton = createButton('Start');
  startButton.position(495, 300);
  startButton.style('font-family: godOfWarFont; border-radius: 25px; border-width: 8px; font-size: 50px;');
  startButton.size(400, 150);
  startButton.mousePressed(function() {currentScene = 1;});

  //create next button
  nextButton = createButton('Next');
  nextButton.position(380, 515);
  nextButton.style('font-family: godOfWarFont; border-radius: 25px; border-width: 5px; font-size: 30px;');
  nextButton.size(130, 60);
  nextButton.mousePressed(nextQuestion);

  //create try again button
  tryAgainButton = createButton('Try Again');
  tryAgainButton.position(340, 515);
  tryAgainButton.style('font-family: godOfWarFont; border-radius: 25px; border-width: 5px; font-size: 30px;');
  tryAgainButton.size(210, 60);
  tryAgainButton.mousePressed(function() {currentScene = 0;});

  //hide buttons
  startButton.hide();
  nextButton.hide();
  tryAgainButton.hide();
}

//function draw called every frame
function draw() {
  //create background
  background("#A7A7A7");

  //set font
  textFont(gowFont);

  //call function to create borders around screen
  borders();

  //call function to check what scene is playing
  checkWhatScene();
}


//function to create borders around screen
function borders() 
{
  //set modes
  rectMode(CENTER);
  angleMode(DEGREES);

  //set strokeweight
  strokeWeight(0);

  /* draw borders */

  //alpha
  let a = 255;

  //loop for drawing
  for (let i = 0; i < 20; i++) 
  {
    //substract alpha
    a -= 20;

    //fill alpha
    fill(200, 0, 0, a);

    //left
    rect(1 * i, 300, 1, 600);

    //top
    rect(400, 1 * i, 800, 1);

    //right
    push();
    translate(800, canvasHeight / 2);
    rotate(180);
    rect(1 * i, 0, 1, 600);
    pop();

    //bottom
    push();
    translate(canvasWidth / 2, 600);
    rotate(180);
    rect(0, 1 * i, 800, 1);
    pop();
  }
}


//function called when displaying start scene
function startScene() 
{
  //set modes
  rectMode(CENTER);
  textAlign(CENTER, CENTER);

  //allow question start to play again
  doQuestionStartOnce = false;

  //set strokeweight
  strokeWeight(0);

  //fill black
  fill("black");
  //set size
  textSize(55);

  //text
  text("The God Of War Quiz", 400, 180, 1000, 50);

  //show start button
  startButton.show();
  //hide try again button
  tryAgainButton.hide();

  //loop answer buttons to hide all
  for(let i = 0; i < buttons.length; i++)
  {
    buttons[i].hide();
  }

  //reset winstate
  winState = 0;

  displayQuestion = true;
  doQuestionStartOnce = false;
}


//function called for new question
function nextQuestion()
{
  //hide next button
  nextButton.hide();

  //allow question buttons to be made again
  createButtonsOnce = false;
  //allow user to guess again
  canGuess = true;
  //display question
  displayQuestion = true;
  //draw timer
  drawTimer = true;
  //reset winstate
  winState = 0;
  //reset timer
  timer = 360;
  //allow question start to play again
  doQuestionStartOnce = false;

  //next question scene
  currentScene++;
}


//function called to display questions
function questionsScene() {
  //hide start button
  startButton.hide();
  
  //if displaying question is allowed
  if(displayQuestion) 
  {
    //check to display once
    if(!doQuestionStartOnce)
    {
      //call function that draws the buttons
      drawQuestionButtonsFunc();

      //do questions scene start once
      doQuestionStartOnce = true;
  
      //allow user to guess
      canGuess = true;

      //create buttons once
      createButtonsOnce = false;
  
      //reset win state
      winState = 0; 
      
      /* reset timer */
      timer = 360;
      drawTimer = true;
    }

    //set modes
    textAlign(CENTER, CENTER);
    rectMode(CENTER);
    imageMode(CENTER);

    //set strokeweight
    strokeWeight(0);

    /* current question text */
    textSize(40);
    fill(150, 0, 0);
    text(`question ${currentScene}/10`, 525, 50, 800, 200);
    rect(525, 80, 150, 4);

    /* actual question text */
    textSize(20);
    fill("black");
    textWrap(WORD);
    text(questions[currentScene - 1][0], 525, 140, 380);
    rect(525, 180, 300, 4);

    //draw timer function
    drawTimerFunc();
    //draw images function
    drawImagesFunc();
    //check win state
    checkWinState();
  }
}


//draw question buttons function
function drawQuestionButtonsFunc()
{
  //loop for displaying buttons
  for(let i = 0; i < buttons.length; i++)
  {
    //show buttons
    buttons[i].show();

    //change text of button
    buttons[i].elt.innerHTML = questions[currentScene - 1][i + 1];
    //change style of button
    buttons[i].style('color: black; background-color: white; font-family: godOfWarFont; border-radius: 25px; border-width: 4px; font-size: 20px;');

    /* change button position */
    if(i == 0)
    {
      buttons[i].position(600, 250);
    }
    else if(i == 1)
    {
      buttons[i].position(820, 250);
    }
    else if(i == 2)
    {
      buttons[i].position(600, 420);
    }
    else if(i == 3)
    {
      buttons[i].position(820, 420);
    }
  }
}

//draw timer function
function drawTimerFunc()
{
  //if allowed to draw timer
  if(drawTimer)
  {
    //make timer red when low on time
    if (timer > 50 && timer < 60 || timer > 30 && timer < 40 || timer < 20) 
    {
      fill("red");
    } 
    else 
    {
      fill("white");
    }
  
    if (timer > 0.4) {
      //decrease timer
      timer -= timerSpeed * (deltaTime / 50);
    } 
    else 
    {
      //when timer done
      currentScene = 12;
    }
  
    //draw timer
    strokeWeight(3);
    arc(150, 490, 120, 120, 0, timer);
  
    //draw timer text
    textSize(20);
    fill('black')
    text('timer', 150, 485, 200, 200);
  }
}

//draw images function
function drawImagesFunc()
{
  //if question scene
  if(currentScene > 0 && currentScene < 11)
  {
    //draw image
    image(images[currentScene - 1], 150, 200, 220, 280);

    //mask image to rounded edges mask
    images[currentScene - 1].mask(mask);
  }
}


//check win state function
function checkWinState()
{
  /* 1 == win, 2 == lose */
  if(winState == 1)
  {
    textSize(40);
    textAlign(CENTER);
    fill('green');
    text('Correct!', 150, 450, 100, 100);
  }
  else if(winState == 2)
  {
    textSize(40);
    textAlign(CENTER);
    fill('red');
    text('Wrong!', 150, 450, 100, 100);
  }
}


//end scene
function endScene()
{
  //hide buttons
  for(let i = 0; i < buttons.length; i++)
  {
    buttons[i].hide();
  }

  //you win text
  fill('red');
  textSize(100);
  text('You Win!', 400, 260, 800, 600);
  textSize(60)
  text('10/10 correct', 400, 380, 800, 600);
}


//check answer function
function checkAnswer(answer)
{
  //if allowed to guess
  if(canGuess)
  {
    /* if correct answer turn green, if wrong turn red */
    if(answer + 1 == questions[currentScene - 1][5])
    {
      buttons[answer].style('background-color: green; color: white');
      nextButton.show();
      drawTimer = false;
      canGuess = false;

      winState = 1;
    }
    else 
    {
      buttons[answer].style('background-color: red; color: white');
      tryAgainButton.show();
      drawTimer = false;
      canGuess = false;

      winState = 2;
    }
  }
}

//out of time scene
function outOfTimeScene()
{
  //text
  fill('red');
  textSize(100);
  text('You ran out of time.', 400, 260, 800, 600);

  displayQuestion = false;
  timer = 0;
  
  //hide buttons
  for(let i = 0; i < buttons.length; i++)
  {
    buttons[i].hide();
  }
  
  //show try again button
  tryAgainButton.show();
}

//check what the current scene is and display
function checkWhatScene()
{  
  if (currentScene == 0) 
  {
    startScene();
  } 
  else if(currentScene > 0 && currentScene < 11)
  {
    questionsScene();
  }
  else if(currentScene == 11)
  {
    endScene();
  }
  else if(currentScene == 12)
  {
    outOfTimeScene();
  }
}