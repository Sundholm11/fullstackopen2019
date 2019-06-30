import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = ({text}) => <h1>{text}</h1>

const Button = ({handleState, text}) => (
    <button
        onClick={handleState}>
        {text}
    </button>
)

const Statistic = ({text, value}) => {
    return(
        <tr>
            <td>{text}</td>
            <td>{value}</td>
        </tr>
    )
}

const Statistics = (props) => {
    const good = props.good
    const neutral = props.neutral
    const bad = props.bad
    const all = props.all
    if (all === 0) {
        return(
            <p>Statistics not available.</p>
        )
    }
    return(
        <div>
            <table>
                <tbody>
                    <Statistic text="Good" value={good} />
                    <Statistic text="Neutral" value={neutral}  />
                    <Statistic text="Bad" value={bad}  />
                    <Statistic text="All" value={good + bad + neutral} />
                    <Statistic text="Average" value={(good - bad)/all} />
                    <Statistic text="Percentage" value={good/all} />
                </tbody>
            </table>
        </div>
    )
}

const App = () => {
    // tallenna napit omaan tilaansa
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    const all = good + bad + neutral

    const setGoodState = () => setGood(good + 1)
    const setNeutralState = () => setNeutral(neutral + 1)
    const setBadState = () => setBad(bad + 1)

    return (
        <div>
            <Header text="Give feedback" />
            <Button handleState={setGoodState} text="Good" />
            <Button handleState={setNeutralState} text="Neutral" />
            <Button handleState={setBadState} text="Bad" />
            <Header text="Statistics" />
            <Statistics
                good={good}
                neutral={neutral}
                bad={bad}
                all={all}
            />
        </div>
    )
}

ReactDOM.render(<App />, 
    document.getElementById('root')
)