import React from 'react'
import {Card, Button} from 'react-bootstrap'
import styles from './css/challenge.module.css'
export default function ChallengeCard({message}) {

    const challenge = message.payload ;
    const quesLink = challenge.question;
    let platform = challenge.platform
    platform = platform.charAt(0).toUpperCase() + platform.slice(1)



    return (
        <div>
            <Card className = {styles.challengeCard}>
                <Card.Header>Challenge from {message.fromMe ? 'You' : message.senderName}</Card.Header>
                <Card.Body>
                    <Card.Title>{platform}</Card.Title>
                    <Card.Text>
                        {challenge.text}
                    </Card.Text>
                </Card.Body>
                <Button href={quesLink} variant="info" target="__blank">See Question</Button>
            </Card>
        </div>
    )
}
