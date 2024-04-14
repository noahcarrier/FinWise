import React from 'react';
import Navbar from '../components/Navbar';
import "../app/globals.css";
import { getCacheFromPage } from '../libs/userManager';
import { NextPageContext } from 'next';



export default function Create() {
    return (
        <main className="bg-gradient-to-b from-cyan-500 to-blue-700 min-h-screen">
            <Navbar isAuthed={true}/>
            <div className='mt-8'>
                <a href="/create" className="ml-32 text-yellow-200 text-lg font-bold bg-blue-700 hover:bg-blue-600 text-white px-4 py-2 rounded-md"> ← Go Back</a>
            </div>

            {/* title */}
            <div className="flex flex-col items-center mt-6 ">
                <h1 className="text-yellow-200 text-5xl font-bold">Create Flashcards</h1>
            </div>
            {/* question and answer input */}
            <div className="flex justify-center mt-6 mb-6">
                <div className="bg-white rounded-lg p-4 mr-4">
                    <h2 className="text-gray-800 text-lg font-bold mb-2">Question</h2>
                    <input type="text" id="questionInput" className="text-black border border-gray-300 rounded-md px-3 py-2 w-64" placeholder="Enter your question" />
                </div>
                <div className="bg-white rounded-lg p-4">
                    <h2 className="text-gray-800 text-lg font-bold mb-2">Answer</h2>
                    <input type="text" id="answerInput" className="text-black border border-gray-300 rounded-md px-3 py-2 w-64" placeholder="Enter your answer" />
                </div>
            </div>
            {/* add card button */}
            <div className="flex justify-center mt-10">
                <button onClick={addCard} className="text-yellow-200 text-lg font-bold bg-blue-700 hover:bg-blue-600 text-white px-4 py-2 rounded-md">Add Card</button>
            </div>
            {/* div for cards to be inserted into */}
            <div id = "createdCards">
            </div>
            
            {/* publish lesson button */}
            <div className="flex justify-center mt-10">
                <button id = "publishButton"  className="text-yellow-200 text-lg font-bold bg-blue-700 hover:bg-blue-600 text-white px-4 py-2 rounded-md hidden">Publish Lesson</button>
            </div>
        </main>
    );
}


// add card
function addCard() {
    const question = (document.getElementById('questionInput') as HTMLInputElement).value;
    const answer = (document.getElementById('answerInput') as HTMLInputElement).value;

    if (question.trim() === '' || answer.trim() === '') {
        alert('Please enter both a question and an answer.');
        return;
    }

    console.log("Question: " + question);
    console.log("Answer: " + answer);

    const card = document.createElement('div');
    card.className = 'bg-white rounded-lg p-4 mt-4 w-96 mx-auto';
    card.innerHTML = `
        <h2 class="text-gray-800 text-2xl font-bold mb-2">${question}</h2>
        <h2 class="text-gray-800 text-lg mt-2">${answer}</h2>
    `;
    // creating a "flashcard"-like size for cards
    card.style.maxWidth = '250px';
    card.style.minHeight = '150px';

    // creating a grid for the cards to be displayed in as inserted
    const createdCards = document.getElementById('createdCards');
    if (createdCards) {
        createdCards.appendChild(card);
        createdCards.style.display = 'grid';
        createdCards.style.gridTemplateColumns = 'repeat(4, minmax(250px, 1fr))';
        createdCards.style.gap = '0.5rem';

        // unhide publish lesson button when first card is added
        const publishButton = document.getElementById('publishButton');
        if (publishButton) {
            publishButton.style.display = 'block';
        }
    }

    (document.getElementById('questionInput') as HTMLInputElement).value = '';
    (document.getElementById('answerInput') as HTMLInputElement).value = '';
}

export const getServerSideProps = async (context: NextPageContext) => {
    /* USE THIS CODE TO TEST AUTHENTICATION (yes, just copy and paste this to page that needs authentication)*/
    const user = await getCacheFromPage(context);
    if (!user) {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        };
    }

    /* Return anything you want from database query from here out */
    return {
        props: {}
    }
}