import React, { useRef, useState } from 'react'
import questions from '../constants/questions.json';

const Quiz = () => {
    let [index, setIndex] = useState(0);
    let [question, setQuestion] = useState(questions[index]);
    let [lock, setLock] = useState(false);
    let [score, setScore] = useState(0);
    let [result, setResult] = useState(false);
    const optionRefs = useRef([null, null, null, null]);
    const checkAnswer = (e, ans) => {
        if (!lock)
            if (question.answer === ans) {
                e.target.classList.add('correct');
                setLock(true);
                setScore(prev => prev + 1);
            } else {
                console.log(question.answer, "===", ans, "===", e)
                e.target.classList.add('wrong')
                optionRefs.current.forEach((ref) => {
                    if (ref && ref.className === question.answer) {
                        ref.classList.add('correct');
                    }
                });
                setLock(true);
            }
    }
    const next = () => {
        if (lock) {
            if (index === questions.length - 1) {
                setResult(true);
                return 0;
            }
            setIndex(++index);
            setQuestion(questions[index]);
            setLock(false);
            optionRefs.current.forEach((ref) => {
                ref.classList.remove('wrong');
                ref.classList.remove('correct');
            });
        }

    }
    const reset = () =>{
        setIndex(0);
        setQuestion(questions[0]);
        setScore(0);
        setLock(false);
        setResult(false);
    }
    return (
        <div className='container'>
            <h1>Quiz App</h1>
            {result ? <>
                <h2>
                    You Scored {score} out of  {questions.length}
                </h2>
                <button onClick={reset}>Reset</button></> : <><h2>{index + 1}. {question.question}</h2>
                <ul>
                    {['A', 'B', 'C', 'D'].map((option, i) => (

                        <li key={option} className={option} ref={(element) => optionRefs.current[i] = element} onClick={(e) => checkAnswer(e, option)}>
                            {question[option]}
                        </li>
                    ))}
                </ul>
                <button onClick={next}>Next</button>
                <div className="index">{index + 1} of {questions.length} question</div>
            </>}
        </div>
    )
}

export default Quiz
