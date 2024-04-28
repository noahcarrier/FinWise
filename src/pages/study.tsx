import React, {useState} from "react";
import Navbar from "@/components/Navbar";
import "../app/globals.css";

const lessonQuestions = [
    {
      question_id: 1,
      question: "What is the capital of France?",
      answer: "Paris",
      attempt: false,
      lesson_id: 1 // Assuming this refers to a lesson with ID 1
    },
    {
      question_id: 2,
      question: "Who wrote 'Romeo and Juliet'?",
      answer: "William Shakespeare",
      attempt: false,
      lesson_id: 1
    },
    {
      question_id: 3,
      question: "What is the powerhouse of the cell?",
      answer: "Mitochondria",
      attempt: false,
      lesson_id: 2 // Assuming this refers to a lesson with ID 2
    },
    {
      question_id: 4,
      question: "What is the chemical symbol for water?",
      answer: "H2O",
      attempt: false,
      lesson_id: 2
    },
    {
      question_id: 5,
      question: "Who painted the Mona Lisa?",
      answer: "Leonardo da Vinci",
      attempt: false,
      lesson_id: 3 // Assuming this refers to a lesson with ID 3
    }
  ];
  

const Study = () => {
    const questionNum = lessonQuestions.length;

    const [side, setSide] = useState(false);

    const [currentQuestion, setCurrentQuestion] = useState(0);
    
    const handleSwitchSubmit = () => {
        console.log("Switch was pressed.");
        setSide(prevSide => !prevSide);
    }

    const handleBeforeSubmit = () => {
        console.log("Before Arrow was pressed.");

        if(currentQuestion > 0){
            setCurrentQuestion(currentQuestion - 1);
        }
    }
    
    const handleCheckmarkSubmit = () => {
        console.log("Check Mark was pressed.");
    }

    const handleCrossmarkSubmit = () => {
        console.log("Cross Mark was pressed.");
    }

    const handleNextSubmit = () => {
        console.log("After Arrow was pressed.");

        if(currentQuestion < questionNum - 1){
            setCurrentQuestion(currentQuestion + 1);
        }
    }

    return(
        <main className="bg-gradient-to-b from-cyan-500 to-blue-700 min-h-screen">
            <Navbar isAuthed={true}/>
            <div className="flex flex-col items-center mt-6 ">
                <h1 className="text-yellow-200 text-5xl font-bold">Study Flashcards</h1>
            </div>
            <div className="flex flex-col items-center mt-6">
                <button onClick={handleSwitchSubmit}>
                    <div className="bg-white rounded-lg shadow-lg p-6" style={{ width: '500px', height: '400px' }}>
                        <h2 className="text-black m-4 text-3xl text-center font-bold mb-4 ">
                            {side ? lessonQuestions[currentQuestion].answer : lessonQuestions[currentQuestion].question}
                        </h2>
                    </div>
                </button>    
                
                <div className="flex">
                    <button onClick={handleBeforeSubmit}>
                        <img src="icons/beforearrow.png" className="rounded-lg mt-8 mr-16" title="Cross Mark" style={{ width: '50px', height: '30px' }}/>
                    </button>
                    <button onClick={handleCheckmarkSubmit}>
                        <img src="icons/checkmark.jpg" className="rounded-lg mt-8 mr-16" title="Cross Mark" style={{ width: '50px', height: '50px' }}/>
                    </button>
                    <button onClick={handleCrossmarkSubmit}>
                        <img src="icons/crossmark.jpg" className="rounded-lg mt-8" title="Check Mark" style={{ width: '50px', height: '50px' }}/>
                    </button>
                    <button onClick={handleNextSubmit}>
                        <img src="icons/nextarrow.png" className="rounded-lg mt-8 ml-16" title="Cross Mark" style={{ width: '50px', height: '30px' }}/>
                    </button>
                </div>
            </div>
        </main>
    );
}

export default Study;