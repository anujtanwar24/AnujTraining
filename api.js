import { Box, Table, TableBody, TableCell, TableHeader, TableRow, Text } from 'grommet';
import React, { useEffect, useState } from 'react';

const Api = ({ advice }) => {
  return (
    <Box>
      <Table>
        <TableHeader pad="2rem">
          <TableRow>
            <TableCell scope="col" border="bottom">
              Username
            </TableCell>
            <TableCell scope="col" border="bottom">
              Category
            </TableCell>
            <TableCell scope="col" border="bottom">
              Rep
            </TableCell>
          </TableRow>
        // </TableHeader>
        {advice.map(e => {
          return (
            <TableRow pad="medium">
              <TableCell scope="row">{e.API}</TableCell>
              <TableCell scope="row">{e.Category}</TableCell>
              <TableCell scope="row">{e.Cors}</TableCell>
            </TableRow>
          );
        })}
      </Table>








    </Box>
  );
};

export default Api;
