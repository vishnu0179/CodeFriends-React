import React, {useRef} from 'react'
import {Modal, Form, Button} from 'react-bootstrap'
import { useConversation } from '../Context/ConversationProvider';



export default function NewChallengeModal({closeModal}) {

    const { sendMessage, selectedConversation } = useConversation()

    const quesRef = useRef();
    const platformRef = useRef();
    const textRef = useRef();

    function submitChallenge(e){
        e.preventDefault();
        //createChallenge()
        const challenge = {
            question : quesRef.current.value,
            platform : platformRef.current.value,
            text : textRef.current.value
        }
        
        sendMessage(selectedConversation.recipients.map(r => r.id), challenge, 'challenge')
        closeModal();
    }

    return (
        <div>
            <Modal.Header>Give a New challenge</Modal.Header>
            <Modal.Body>
                <Form onSubmit={submitChallenge} >
                    <Form.Group>
                        <Form.Label>Question Link</Form.Label>
                        <Form.Control type="text" ref={quesRef} ></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Platform</Form.Label>
                        <Form.Control as="select" ref={platformRef} custom>
                            <option value="codeforces">Codeforces</option>
                            <option value="codechef">Codechef</option>
                            <option value="spoj">Spoj</option>
                            <option value="hackerrank">Hackerrank</option>
                            <option value="others">Others</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Control type = "text" placeholder="Any Comments..." ref={textRef}/>
                    </Form.Group>
                    <Button type="submit">Challenge</Button>
                </Form>
            </Modal.Body>
        </div>
    )
}
