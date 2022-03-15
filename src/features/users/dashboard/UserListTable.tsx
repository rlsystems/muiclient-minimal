
import { Link, Link as RouterLink } from 'react-router-dom';

import * as React from 'react';


// @mui
import {
    Card,
    Table,

    Button,

    TableRow,
    TableBody,
    TableCell,

    TableContainer,
    TablePagination,
    TableHead,
    TableSortLabel,
    Chip,
} from '@mui/material';

import Scrollbar from '../../../components/Scrollbar';
import SearchNotFound from '../../../components/SearchNotFound';
// sections
import { useStore } from 'src/app/stores/store';
import UserListToolbar from './UserListToolbar';

// ----------------------------------------------------------------------

interface Column {
    id: 'first' | 'last' | 'email' | 'role' | 'active' | 'guid';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
}

const columns: readonly Column[] = [
    { id: 'first', label: 'First' },
    { id: 'last', label: 'Last' },
    { id: 'email', label: 'Email' },
    { id: 'role', label: 'Role' },
    { id: 'active', label: 'Active' },
    { id: 'guid', label: 'GUID' },
];

// ----------------------------------------------------------------------

export default function UserListTable() {

    const { appUserStore } = useStore();
    const { appUsersSorted } = appUserStore;


    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };



    return (
        <Card>

            <UserListToolbar />
            <Scrollbar>
                <TableContainer sx={{ minWidth: 800 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                    >
                                        <TableSortLabel
                                            hideSortIcon
                                        >
                                            {column.label}

                                        </TableSortLabel>
                                    </TableCell>
                                ))}
                                <TableCell />
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {appUsersSorted
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((user) => {
                                    return (
                                        <TableRow key={user.id}>
                                        <TableCell>{user.firstName}</TableCell>
                                        <TableCell>{user.lastName}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>{user.roleId}</TableCell>
                                        <TableCell>{user.isActive ?
                                            <Chip label="True" variant="outlined" color="success" sx={{width: '4rem'}} /> :
                                            <Chip label="False" variant="outlined" color="error"  sx={{width: '4rem'}}/>}
                                        </TableCell>
                                        <TableCell>{user.id}</TableCell>
                                        <TableCell sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        
                                            <Button component={Link} to={`/editUser/${user.id}`} variant="text" >
                                                Edit
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Scrollbar>

            <TablePagination
                rowsPerPageOptions={[5]}
                component="div"
                count={appUsersSorted.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Card>
    );
}

// ----------------------------------------------------------------------


