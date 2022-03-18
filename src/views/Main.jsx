import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Row, Col } from 'react-bootstrap'
import api from '../api/api'
import { styled } from '@mui/material/styles'
import Log from '../components/UI/Log'
import { parseForm } from '../lib/lib';

const Logs = styled('div')({
	border: '1px solid black'
})

const VerticalFlex = styled('div')({
	display: 'flex',
	flexDirection: 'column',
	marginBottom: '20px',
})

const Main = (props) => {

	const [logs, setLogs] = useState([])
	const [login, setLogin] = useState('xxx')
	const [password, setPassword] = useState('xxx')
	const [accessToken, setAccessToken] = useState('')

	const post = (data, cb) => {
		api.post(data, { accessToken }).then(({ data }) => {
			setLogs([...logs, data])
			if (cb) cb(data)
		}).catch((data) => setLogs([...logs, data]))
	}

	const get = (data) => {
		api.get(data, { accessToken }).then(({ data }) => setLogs([...logs, data])).catch((data) => setLogs([...logs, data]))
	}

	useEffect(() => {
		post({ path: 'login', data: { login, password } }, ({ accessToken }) => setAccessToken(accessToken))
	}, [])

	return (
		<Row>
			<Col xs={6}>

				<VerticalFlex>
					<Button variant="get" onClick={() => get({ path: "user_info" })}>
						Информация об игроке
					</Button>
				</VerticalFlex>

				<VerticalFlex>
					<TextField value={login} label="Имя" variant="outlined" onChange={(e) => setLogin(e.currentTarget.value)} />
					<TextField value={password} label="Пароль" variant="outlined" onChange={(e) => setPassword(e.currentTarget.value)} />
					<Button variant="contained" color="warning" onClick={() => post({ path: 'register', data: { login, password } }, ({ accessToken }) => setAccessToken(accessToken))}>
						Регистрация
					</Button>
					<Button variant="contained" color="warning" onClick={() => post({ path: 'login', data: { login, password } }, ({ accessToken }) => setAccessToken(accessToken))}>
						Авторизация
					</Button>
				</VerticalFlex>

				<form onSubmit={(e) => get({ path: "players", data: parseForm(e, ['x', 'y']) })}>
					<VerticalFlex>
						<div className="d-flex justify-content-between">
							<TextField name="x" label="X" variant="outlined" />
							<TextField name="y" label="Y" variant="outlined" />
						</div>
						<Button variant="contained" color="success" type="submit">
							Получить список игроков рядом
						</Button>
					</VerticalFlex>
				</form>

				<form onSubmit={(e) => post({ path: 'move', data: parseForm(e, ['x', 'y']) })}>
					<VerticalFlex>
						<div className="d-flex justify-content-between">
							<TextField name="x" label="X" variant="outlined" />
							<TextField name="y" label="Y" variant="outlined" />
						</div>
						<Button variant="contained" color="warning" type="submit">
							Перемещение
						</Button>
					</VerticalFlex>
				</form>

				<form onSubmit={(e) => post({ path: 'deposit', data: parseForm(e, ['amount']) })}>
					<VerticalFlex>
						<TextField name="amount" label="Количество" variant="outlined" />
						<Button variant="contained" color="warning" type="submit">
							Пополнить кошелек
						</Button>
					</VerticalFlex>
				</form>

				<VerticalFlex>
					<Button variant="contained" color="success" onClick={() => get({ path: 'nfts' })}>
						Получить все NFT
					</Button>
				</VerticalFlex>

				<form onSubmit={(e) => post({ path: "resource", data: parseForm(e, ["resource"]) })}>
					<VerticalFlex>
						<Select
							name="resource"
							value="stone"
							label="Тип"
						>
							<MenuItem value={'stone'}>Stone</MenuItem>
							<MenuItem value={'wood'}>Wood</MenuItem>
							<MenuItem value={'water'}>Water</MenuItem>
						</Select>
						<Button type="submit" variant="contained" color="warning">
							Новый ресурс
						</Button>
					</VerticalFlex>
				</form>

				<VerticalFlex>
					<Button variant="contained" color="success" onClick={() => get({ path: "resources" })}>
						Список ресурсов
					</Button>
				</VerticalFlex>

				<form onSubmit={(e) => post({ path: 'object', data: parseForm(e, ['x', 'y', 'object']) })}>
					<VerticalFlex>
						<Select
							value="car"
							name="object"
							label="Тип"
						>
							<MenuItem value={'car'}>Car</MenuItem>
							<MenuItem value={'plane'}>Plane</MenuItem>
						</Select>
						<div className="d-flex justify-content-between">
							<TextField name="x" label="X" variant="outlined" />
							<TextField name="x" label="Y" variant="outlined" />
						</div>
						<Button variant="contained" color="warning" type="submit">
							Новый объект
						</Button>
					</VerticalFlex>
				</form>

				<VerticalFlex>
					<Button variant="contained" color="success" onClick={() => get({ path: 'objects' })}>
						Список Объектов
					</Button>
				</VerticalFlex>

				<VerticalFlex>
					<Button variant="contained" color="error" onClick={() => post({ path: 'reset', data: { type: 'Player' } })}>
						Сброс пользователей
					</Button>
				</VerticalFlex>

				<VerticalFlex>
					<Button variant="contained" color="error" onClick={() => post({ path: 'reset_all' })}>
						Сбросить ядерную боеголовку на Киев
					</Button>
				</VerticalFlex>

			</Col>
			<Col xs={6}>
				<Logs>
					{logs.map((log, index) => <Log key={index} log={log} />)}
				</Logs>
				<VerticalFlex>
					<Button variant="contained" color="error" onClick={() => setLogs([])}>
						Очистить логи
					</Button>
				</VerticalFlex>
			</Col>
		</Row>
	)
}

export default (Main)