import React, { useState, useEffect } from 'react'
import axios from 'axios'

const cardStyle = ({
    border: '1px solid rgba(255, 255, 255, 0.05)',
    padding: '3rem',
    borderRadius: '1rem',
    boxShadow: '0 0 10px 5px rgba(0, 0, 0, 0.2)',
})

const responseStyle = ({
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: '1rem',
    borderRadius: '1rem'
})

const ListItem = props => {
    const [secret, setSecret] = useState()
    const { endpoint } = props

    useEffect(() => {
        axios.get(endpoint)
            .then(response => setSecret(response.data))
            .catch(error => console.log('Error', error))
    }, [])

    return (
        <div style={ cardStyle }>
            <p>Response from API:</p>
            <div style={ responseStyle }>
                { secret }
            </div>
        </div>
    )
}

export default ListItem