import React from 'react'
import 'semantic-ui-css/semantic.min.css'
import { Card, Icon, Image, Button } from 'semantic-ui-react'

const Product = ({product}) => {
    console.log(product)
    return (
        <Card>
            <Image src={product.image} wrapped ui={false} />
            <Card.Content>
            <Card.Header>{product.name}</Card.Header>
            <Card.Meta>
                <span className='date'>${product.price}</span>
            </Card.Meta>
            <Card.Description>
                {product.description}
            </Card.Description>
            </Card.Content>
            <Card.Content extra>
            <Button animated='vertical'>
                <Button.Content hidden>Purchase</Button.Content>
                <Button.Content visible>
                    <Icon name='shop' />
                </Button.Content>
            </Button>
            </Card.Content>
        </Card>
    )
}

export default Product; 