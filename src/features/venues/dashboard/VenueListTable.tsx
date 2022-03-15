import * as React from 'react';

// @mui
import {
    Table,
    TableRow,
    TableBody,
    TableCell,
    TableContainer,
    TablePagination,
    TableHead,
    TableSortLabel,
    
} from '@mui/material';

// sections
import { useStore } from 'src/app/stores/store';
import VenueListToolbar from './VenueListToolbar';
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

export default function VenueListTable() {

    const { venueStore } = useStore();
    const { venuesSorted } = venueStore;


    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(20);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };


    return (
        <div>

            <VenueListToolbar />

            <TableContainer sx={{ minWidth: 800, height: 'calc(100vh - 19rem)' }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead >
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    sx={{'&:first-of-type' : { borderTopLeftRadius: 0, borderBottomLeftRadius: 0, boxShadow: 'none'}, bgcolor: 'background.default'}}
                                >
                                    <TableSortLabel
                                        hideSortIcon
                                    >
                                        {column.label}

                                    </TableSortLabel>
                                </TableCell>
                            ))}
                            <TableCell sx={{'&:last-of-type' : { borderTopRightRadius: 0, borderBottomRightRadius: 0, boxShadow: 'none'}, bgcolor: 'background.default'}} />
                        </TableRow>
                    </TableHead>
          
                        <TableBody sx={{  width: '100%' }}>
                            {venuesSorted
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
                                                <RowOptionsMenu venueId={row.id} />
                  
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
           
                </Table>
            </TableContainer>

            <TablePagination
                rowsPerPageOptions={[20]}
                component="div"
                count={venuesSorted.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </div>
    );
}

// ----------------------------------------------------------------------


