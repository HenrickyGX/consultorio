import { Box, Card, Container } from "@mui/material";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { ConsultasContext } from "../../context/ConsultasContext";
import { useContext} from 'react'

export default function ListarConsultas() {
    const {consultas}  = useContext(ConsultasContext)

    

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
            field: 'data',
            headerName: 'Data',
            width: 150,
            valueFormatter: ({value}) => new Date(value as string).toLocaleString(
                'pt-BR', {year: 'numeric', month: '2-digit', day:'2-digit', hour: '2-digit', minute: '2-digit'}
            )
           
        },
        {
            field: 'nomePaciente',
            headerName: 'Nome do Paciente',
            width: 150,
            editable: true,
           
        },
        {
            field: 'numeroTel',
            headerName: 'Nº Telefone',
            type: 'number',
            width: 150,
            
           
        },
        {
            field: 'emailDoutor',
            headerName: 'Email Doutor',
            type: 'email',
            width: 150,
            
        },
        
    ];

    

    
    return (
        <Container maxWidth="sm">
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="100vh"
            >
                <Card elevation={3} sx={{ padding: 4, borderRadious: 2, minWidth: '900px'  }}>
                    <DataGrid
                        rows={consultas || []}
                        columns={columns}
                        
                        pageSize={5}


                    />
                </Card>

            </Box>
        </Container>
    )
}