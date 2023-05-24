import { Box, Button, Card, Container, MenuItem, Select, TextField } from "@mui/material"
import { ConsultasContext } from "../../context/ConsultasContext"
import {useContext, useState} from 'react'
import { addMinutes, setHours, setMinutes } from "date-fns"

export default function AgendarConsulta() {

   const {consultas, doutores, agendarConsulta} = useContext(ConsultasContext)

   const [data, setData] = useState('')
   const [nomePaciente, setNomePaciente] = useState('')
   const [numeroTel, setNumeroTel] = useState('')
   const [emailDoutor, setEmailDoutor] = useState('')
   const [time, setTime] = useState('08:00')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        
        const dataAtual = new Date(data)
        const [horas, minutos] = time.split(':')
        const dataComHora = setMinutes(setHours(dataAtual, Number(horas)), Number(minutos))

        const fusoHorario = dataComHora.getTimezoneOffset();
        const dataUTC = addMinutes(dataComHora, fusoHorario).toISOString();

        console.log(dataUTC)

        agendarConsulta!({ id:consultas?.length , nomePaciente, numeroTel, emailDoutor, data:dataUTC  })
        setData('')
        setNomePaciente('')
        setNumeroTel('')
        setEmailDoutor('')
        setTime('08:00')
    }
    

    
    
    const horarios = []
    for( let i = 8; i< 18; i++){
        horarios.push(i< 10 ? `0${i}:00` : `${i}:00`)
    }
   console.log(consultas)
    return (
        <Container maxWidth="sm">
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="100vh"
            >
                <Card elevation={3} sx={{ padding: 4, borderRadious: 2 }}>
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: "column", gap: "10px" }}>
                        <TextField
                            label="Nome do Paciente"
                            type="text"
                            value={nomePaciente}
                            onChange={(e => setNomePaciente(e.target.value))}

                        />
                        <TextField
                            label="Telefone"
                            type="tel"
                            value={numeroTel}
                            onChange={(e => setNumeroTel(e.target.value))}

                        />

                        <TextField
                            label="Data"
                            
                            type="date"
                            value={data}
                            onChange={(e => setData(e.target.value))}

                        />
                        <Select
                            value={time}
                            onChange={e => setTime(e.target.value)}
                        >
                            {horarios.map((hora, index) => (
                                <MenuItem key={index} value={hora}>
                                    {hora}
                                </MenuItem>
                            ))}
                        </Select>

                        <Select
                            value={emailDoutor}
                            onChange={ e => setEmailDoutor(e.target.value)
                            }
                    
                        >
                            {doutores?.map ((doutor, index) =>
                                <MenuItem key={index} value={doutor.email} >
                                {doutor.email}
                                </MenuItem>
                                )}
                        </Select>
                        <Button  type="submit">
                            Agendar
                        </Button>
                    </form>
                </Card>

            </Box>
        </Container>

    )
}