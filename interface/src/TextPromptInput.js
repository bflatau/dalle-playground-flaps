import React, {useState} from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import {TextField} from "@material-ui/core";

const useStyles = () => ({
    inputPrompt: {
        marginTop: '20px',
    },
})

const allData = {};

allData.text = "TEST";

const data = JSON.stringify(allData);

const TextPromptInput = ({classes, enterPressedCallback, disabled}) => {
    const [promptText, setPromptText] = useState('');

    function handleTextPromptKeyPressed(event) {
        if (event.key === 'Enter') {
            enterPressedCallback(promptText)


            const data = "text=" + promptText.toUpperCase();

            console.log(data);


            // UPDATE FLAPS HERE
            fetch('http://0.0.0.0:8090/splitflap/set_flaps', {
                method: 'POST', // or 'PUT'
                mode: 'no-cors',
                headers: {
                    // 'Content-Type': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: data
                })
                // .then(response => response.json())
                // .then(data => {
                // console.log('Success:', data);
                // })
                // .catch((error) => {
                // console.error('Error:', error);
                // });
        }
    }

    function onTextChanged(event) {
        setPromptText(event.target.value)
    }

    return (
        <TextField className={classes.inputPrompt} id="prompt-input" label="Text prompt"
                   helperText="hit Enter to search"
                   placeholder="e.g. an apple on a table" value={promptText}
                   onChange={onTextChanged} fullWidth
                   onKeyPress={handleTextPromptKeyPressed} disabled={disabled}/>
    )
}

export default withStyles(useStyles)(TextPromptInput);