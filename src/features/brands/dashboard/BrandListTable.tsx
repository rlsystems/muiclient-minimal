
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
} from '@mui/material';

import Scrollbar from '../../../components/Scrollbar';
import SearchNotFound from '../../../components/SearchNotFound';
// sections
import { useStore } from 'src/app/stores/store';
import BrandListToolbar from './BrandListToolbar';
import RowOptionsMenu from './RowOptionsMenu';

// ----------------------------------------------------------------------

interface Column {
    id: 'name' | 'description' | 'id';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
}

const columns: readonly Column[] = [
    { id: 'name', label: 'Name', minWidth: 170 },
    { id: 'description', label: 'Desc', minWidth: 100 },
    {
        id: 'id',
        label: 'GUID',
        minWidth: 170,
       
    }
];

// ----------------------------------------------------------------------

export default function BrandListTable() {

    const { brandStore } = useStore();
    const { brandsSorted } = brandStore;


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

            <BrandListToolbar />
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
                                <TableCell/>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {brandsSorted
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                            {columns.map((column) => {
                                                const value = row[column.id];
                                                return (
                                                    <TableCell key={column.id} align={column.align}>
                                                        {column.format && typeof value === 'number'
                                                            ? column.format(value)
                                                            : value}
                                                    </TableCell>
                                                );
                                            })}
                                            <TableCell sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                                <RowOptionsMenu brandId={row.id}/>
                                                {/* <Button
                                                    variant="text"
                                                    color="error"
                                                    onClick={() => brandStore.deleteBrand(row.id)}
                                                    sx={{ mr: 1 }}
                                                >
                                                    Delete
                                                </Button>
                                                <Button component={Link} to={`/editBrand/${row.id}`} variant="text" >
                                                    Edit
                                                </Button> */}
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
                count={brandsSorted.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Card>
    );
}

// ----------------------------------------------------------------------


