export const getChannelsFromServer = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch('http://localhost:3001/api/channels/channels', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error('Unauthorized: no token provided');
    }

    const channels = await response.json();
    return channels.channels;
};

export const getMessagesFromServer = async (channelId) => {
  const response = await fetch(`http://localhost:3001/api/messages/channels/${channelId}/messages`, {
      method: 'GET',
      headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`, 
          'Content-Type': 'application/json',
      }
  });

  const data = await response.json();
  

  if (response.ok && Array.isArray(data.messages)) {
      return data.messages; // Make sure this is an array
  } else {
      console.error('Failed to fetch messages:', data.error || 'Unknown error');
      return []; // Return an empty array on failure
  }
  
};

export const clearChatForChannel = async (channelId) => {
  await fetch(`http://localhost:3001/api/messages/channels/${channelId}/messages`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,  // Add your token here
      'Content-Type': 'application/json', // Ensure that the Content-Type is JSON
    }
  });
};

export const sendMessageToServer = async (channelId, content) => {
  await fetch(`http://localhost:3001/api/messages/channels/${channelId}/messages`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify({ content }),
  });
};


export const createChannelOnServer = async (channelName) => {
  const response = await fetch('http://localhost:3001/api/channels/channels', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Authorization if needed
      },
      body: JSON.stringify({ name: channelName, description: 'abc' }), // Send 'name' and an empty 'description'
  });

  if (!response.ok) {
      const errorData = await response.json();
      console.error('Error creating channel:', errorData);
      throw new Error(errorData.error);
  }

  return response.json(); // Return the response data
};
  
  export const deleteChannelOnServer = async (channelId) => {
    console.log('Sending DELETE request for channel:', channelId); // Add this to check if channelId is undefined
    try {
        const response = await fetch(`http://localhost:3001/api/channels/channels/${channelId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`, // Include token if required
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Error deleting channel:', errorData);
            throw new Error(`Failed to delete channel: ${errorData.error}`);
        }
    } catch (error) {
        console.error('Error occurred during delete request:', error);
        throw error;
    }
};


export const fetchRandomJoke = async () => {
  try {
      const response = await fetch('https://v2.jokeapi.dev/joke/Any');
      if (!response.ok) {
          throw new Error('Failed to fetch joke');
      }
      const jokeData = await response.json();
      return jokeData;
  } catch (error) {
      console.error('Error fetching joke:', error);
      return null;
  }
};
