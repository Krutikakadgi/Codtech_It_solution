const questions =[
    {
    question:"Who is the President of India?",
    answers:[
        {text:"Narendra Modi",correct:false},
        {text:"APJ Abdul Kalam",correct:false},
        {text:"Droupadi Murmu",correct:true},
        {text:"Rajiv Gandhi",correct:false},
         ]
    },  

    {
        question:"Which of the Indian activists was popularly known as 'Lokhitwadi'?",
        answers:[
            {text:"Gopal Hari Deshmukh",correct:true},
            {text:"Gopal Krishna Gokhale",correct:false},
            {text:"Pherozshah Mehta",correct:false},
            {text:"Bal Gangadhar Tilak",correct:false},
             ]
     },  

       {
            question:"Who wrote the lyrics of National Anthem of India?",
            answers:[
                {text:"Bankim Chandra Chatterjee",correct:false},
                {text:"Annie Besant",correct:false},
                {text:"Rabindranath Tagore",correct:true},
                {text:"Ram Prasad Bismil",correct:false},
                 ]
        },  
        
        {
            question:"Annie Besant was associated with??",
            answers:[
                {text:"Khilafat Movement",correct:false},
                {text:"Non-Cooperation Movement",correct:false},
                {text:" Civil Disobedience Movement",correct:false},
                {text:"Home Rule Movement",correct:true},
                 ]
            },  
            
            {
                question:"In which year Azad Hind Radio Service was started?",
                answers:[
                    {text:"1942",correct:true},
                    {text:"1945",correct:false},
                    {text:"1939",correct:false},
                    {text:"1940",correct:false},
                     ]
                }  
];

const questionElement = document.getElementById("question");
const answerButtons  = document.getElementById("answer-buttons");
const nextButton  = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML="Next";
    showQuestion();
}

function showQuestion(){

    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNO = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNO + " . " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct
        }
        button.addEventListener("click",selectAnswer);

    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn .dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";

}
function showScore(){
    resetState();
    questionElement.innerHTML = ` Score ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Try Again";
    nextButton.style.display = "block";
}
function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex < questions.length){
      handleNextButton();
    }else{
        startQuiz();
    }
});
startQuiz();