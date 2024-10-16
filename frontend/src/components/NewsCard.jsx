import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

const NewsCard = (props) => {


    return (
        <div className='card w-[19rem] '>
            <Card style={{ width: '19rem' }} bg="dark" text='white' border='light'>
                <Card.Img variant="top" src={props.urlToImage} />
                <Card.Body>
                    <Card.Title>{props.title?.substring(0, 100)}</Card.Title>
                    <Card.Text>
                        {props.description?.substring(0, 200)}...
                    </Card.Text>
                    <ListGroup className="list-group-flush">
                        <ListGroup.Item className='bg-dark text-white'><b>Published At:</b> {props.publishedAt}</ListGroup.Item>
                        <ListGroup.Item className='bg-dark text-white'><b>Author:</b> {props.author}</ListGroup.Item>
                        <ListGroup.Item className='bg-dark text-white'><b>Source:</b> {props.source}</ListGroup.Item>
                    </ListGroup>
                    <Button variant="primary">
                        <a href={props.url} target='_blank' className='no-underline'>Read more</a>
                    </Button>
                </Card.Body>
            </Card>
        </div>
    )
}

export default NewsCard