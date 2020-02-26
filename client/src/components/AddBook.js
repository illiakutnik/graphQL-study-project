import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import {
	getAuthorsQuery,
	addBookMutation,
	getBooksQuery
} from '../queries/queries'

const AddBook = () => {
	const [formData, setFormData] = useState({
		name: '',
		genre: '',
		author: ''
	})
	const { data, loading } = useQuery(getAuthorsQuery)
	const [addBook] = useMutation(addBookMutation)

	const displayAuthors = () => {
		if (loading) {
			return <option disabled>Loading Authors...</option>
		} else {
			return data.authors.map(author => {
				return (
					<option key={author.id} value={author.id}>
						{author.name}
					</option>
				)
			})
		}
	}

	const handleChange = e => {
		setFormData({ ...formData, [e.target.name]: e.target.value })
	}

	const handleSubmit = e => {
		e.preventDefault()
		addBook({
			variables: {
				name: formData.name,
				genre: formData.genre,
				authorId: formData.author
			},
			refetchQueries: [{ query: getBooksQuery }]
		})
		setFormData({ name: '', genre: '', author: '' })
	}

	return (
		<form id='add-book' onSubmit={handleSubmit}>
			<div className='field'>
				<label>Book name:</label>
				<input
					name='name'
					type='text'
					value={formData.name}
					onChange={e => handleChange(e)}
				/>
			</div>

			<div className='field'>
				<label>Genre:</label>
				<input
					name='genre'
					type='text'
					value={formData.genre}
					onChange={e => handleChange(e)}
				/>
			</div>

			<div className='field'>
				<label>Author:</label>
				<select name='author' onChange={e => handleChange(e)}>
					<option>Select Author</option>
					{displayAuthors()}
				</select>
			</div>

			<button type='submit'>+</button>
		</form>
	)
}

export default AddBook
