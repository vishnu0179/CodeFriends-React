import React, { useState, useCallback } from 'react'
import { Form, InputGroup, Button, Modal} from "react-bootstrap";
import { useConversation } from '../Context/ConversationProvider';
import NewChallengeModal from './NewChallengeModal'
import ChallengeCard from './ChallengeCard'
export default function OpenConversation() {

    const [text, setText] = useState('')
    const [modalOpen, setModalOpen] = useState(false);
    const { sendMessage, selectedConversation } = useConversation()
    const setRef = useCallback(node => {
        if(node)
        {
            node.scrollIntoView({smooth: true})
        }
    }, [])
    function handleSubmit(e) {
        e.preventDefault()
        //console.log(selectedConversation);

        sendMessage(selectedConversation.recipients.map(r => r.id), text, 'message')
        setText('')

    }

    // function createChallenge(quesLink, platform, text) {
        
    //     const challenge = {
    //         question,
    //         platform,
    //         text
    //     }
    // }

    // function sendChallenge(e) {
    //     //sendChallenge(selectedConversation.recipients.map(r => r.id), challenge, 'challenge')
    //     const challenge = {
    //         question,
    //         platform,
    //         text
    //     }



    // }

    return (
        <div className='d-flex flex-column flex-grow-1 '>
            <div className="flex-grow-1 overflow-auto">
                <div className="d-flex flex-column align-items-start justify-content-end px-3">
                    {selectedConversation.messages.map((message, index) => {

                        const lastMessage = selectedConversation.messages.length - 1 === index
                        
                        if(message.type === "challenge") {
                            return (
                                <div 
                                    key = {index} 
                                    className={`my-1 d-flex flex-column ${message.fromMe ? 'align-self-end':''}`}
                                    ref = {lastMessage ? setRef : null} >
                                    <ChallengeCard message = {message} />
                                </div>
                            )
                        }

                        return (
                            <div
                                ref = {lastMessage ? setRef : null}
                                key={index}
                                className={`my-1 d-flex flex-column ${message.fromMe ? 'align-self-end':''}`}
                            >
                                <div className={`rounded px-2 py-1 ${message.fromMe ? 'bg-primary text-white' : 'border'}`}>
                                    {message.payload}
                                </div>
                                <div className = {`text-muted small ${message.fromMe ? 'text-right':''}`}>
                                    {message.fromMe ? 'You' : message.senderName}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="m-2">
                    <InputGroup>
                        <Form.Control
                            as="textarea"
                            required
                            value={text}    
                            onChange={e => setText(e.target.value)}
                            style={{ height: '75px', resize: 'none' }}
                        />
                        <InputGroup.Append>
                            <Button type='submit'> Send </Button>
                            <Button onClick={()=>{setModalOpen(true)}} variant="success"> Send Challenge </Button>
                        </InputGroup.Append>
                    </InputGroup>
                </Form.Group>
            </Form>
            <Modal show = {modalOpen} onHide = {() => {setModalOpen(false)}}>
                <NewChallengeModal closeModal={setModalOpen} />
            </Modal>
        </div>

    )   
}
