import React from 'react';
import './Question.css';
import {FormControl, FormControlLabel, FormLabel, Radio, RadioGroup} from "@material-ui/core";

export default function Question(props) {
  let answer = props.answer || -1;

  return (
    <div className='question-container'>
      <FormControl component="fieldset">
        <FormLabel component="legend">{props.index + 1 + '. ' + props.text}</FormLabel>
        <RadioGroup value={answer} onChange={props.onAnswer}>
          {props.variants.map(i => (
            <FormControlLabel key={i.text} value={i.value} control={<Radio/>} label={i.text} disabled={props.disabled}/>
          ))}
        </RadioGroup>
      </FormControl>
    </div>
  );

}
