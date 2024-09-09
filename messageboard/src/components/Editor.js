// Editor.js
import React from 'react';
import { fetchRandomJoke } from '../api'; // Import the joke-fetching function

function Editor({ selectedChannel, newMessage, handleInputChange, handleFormSubmit }) {
    
    const handleSendJoke = async (e) => {
        e.preventDefault();
        
        const joke = await fetchRandomJoke();
        if (joke) {
            // Format the joke based on the response structure
            const jokeText = joke.setup ? `${joke.setup} - ${joke.delivery}` : joke.joke;

            // Submit the joke to the chat
            handleFormSubmit(e, jokeText); // Pass the joke as a message
        }
    };

    return (
        <>
            {selectedChannel && (
                <div>
                    <h2>Editor</h2>
                    <form onSubmit={(e) => handleFormSubmit(e, newMessage)}>
                        <textarea
                            value={newMessage}
                            onChange={handleInputChange}
                            placeholder="Type your message..."
                        />
                        <button type="submit" disabled={!newMessage}>
                            Submit
                        </button>
                    </form>

                    {/* "Send a Joke" Button */}
                    <button onClick={handleSendJoke}>
                        Send a Joke
                    </button>
                </div>
            )}
        </>
    );
}

export default Editor;
