const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

// Disable / Enable button
function toggleButton(){
    button.disabled = !button.disabled;

}

// Pass joke to voicerss api
function tellMe(joke){
    console.log("Tell me:", joke);
    VoiceRSS.speech({
                key: 'ea3c391619ae48dba359fbf0560077d0',
                src: joke,
                hl: 'en-us',
                r: 0, 
                c: 'mp3',
                f: '44khz_16bit_stereo',
                ssml: false
            });
}


// Get Jokes from Joke-API
async function getJokes(){
    let joke = '';
    const apiUrl = 'https://sv443.net/jokeapi/v2/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist';
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.setup){
            joke = `${data.setup} ... ${data.delivery}`;
        } else {
            joke = data.joke;
        }
        // Text-to-speech
        tellMe(joke);
        // Disable Button
        toggleButton();
        
    } catch(error){
        // Catch error here
        console.log("whoops", error)
    }
}

// Event Listeners
button.addEventListener('click',getJokes);
audioElement.addEventListener('ended',toggleButton);


// test();
