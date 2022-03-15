
import { Link, Link as RouterLink } from 'react-router-dom';

import * as React from 'react';


// @mui
import {
    Card,
    Table,
    Chip,
    Button,

    TableRow,
    TableBody,
    TableCell,

    TableContainer,
    TablePagination,
    TableHead,
    TableSortLabel,
} from '@mui/material';

import Scrollbar from '../../../components/Scrollbar';
import SearchNotFound from '../../../components/SearchNotFound';
// sections
import { useStore } from 'src/app/stores/store';

// ----------------------------------------------------------------------



// ----------------------------------------------------------------------

export default function TenantListTable() {

    const { tenantStore } = useStore();
    const { tenantsSorted } = tenantStore;


    return (
        <Card>

            
            <Scrollbar>
                <TableContainer sx={{ minWidth: 800 }}>
                <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Id</TableCell>
                        <TableCell>Key</TableCell>
                        <TableCell>Active</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tenantsSorted.map((tenant) => (
                        <TableRow key={tenant.id}>
                            <TableCell>{tenant.id}</TableCell>
                            <TableCell>{tenant.key}</TableCell>
                            <TableCell>{tenant.isActive ?
                                <Chip label="True" variant="outlined" color="success" sx={{width: '4rem'}} /> :
                                <Chip label="False" variant="outlined" color="error"  sx={{width: '4rem'}}/>}
                            </TableCell>
                            
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
                </TableContainer>
            </Scrollbar>

           
        </Card>
    );
}

// ----------------------------------------------------------------------


