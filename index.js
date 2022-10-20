import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { connect } from 'react-redux';
import { Box } from 'grommet';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
// import { Share } from 'grommet-icons';
import { Trash } from 'grommet-icons';

// Core Imports
import EventEmitter from 'granite-admin/utils/event-emitter';
import Loader from 'granite-admin/core/components/Loader';
import List from 'granite-admin/core/components/List';

// Application Imports
import { COLUMNS } from 'customers/controllers/constants';

import customerAPI from '../../anuj/gateway/api';

import * as OrganisationDucks from 'granite-admin/organisations/ducks/organisations';
import { getStatusList } from 'granite-admin/common/controllers/status-master';
import { searchEmployee, validateCustomerData } from 'customers/controllers/customer';
import Details from '../customerList/components/Details';
import {
  Avatar,
  // Box,
  Button,
  Form,
  FormField,
  Grid,
  Image,
  Layer,
  // List,
  Select,
  Stack,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  Tabs,
  Text,
  TextArea,
  TextInput,
} from 'grommet';
// import React from 'react';
import laptop from 'assets/laptop.png';
import monitor from 'assets/monitor.png';
import { Edit, User } from 'grommet-icons';
// import { useState } from 'react';
// import { useEffect } from 'react';
// import { COLUMNS } from '../../jatinList/controllers/constants';
// import SplitLayout from 'granite-admin/core/components/SplitLayout';
function Anuj() {
  const [value, setValue] = React.useState({});
  const [show, setShow] = useState('');
  // const [advice, setAdvice] = useState([]);
  // const url = 'https://api.publicapis.org/entries';
  // const fetchData = async () => {
  //   try {
  //     const response = await fetch(url);

  //     const json = await response.json();
  //     const splic = json.entries.slice(55, 72);
  //     console.log(json);
  //     setAdvice(splic);
  //   } catch (error) {
  //     console.log('error', error);
  //   }
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);
  const { status } = useParams();
  const eventEmitter = useMemo(() => new EventEmitter(), []);
  const [statusList, setStatusList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const subscription = eventEmitter.getObservable().subscribe(event => {
      switch (event.type) {
        case 'STATUS_GET_SUCCESS':
          setStatusList(event.data);
          setLoading(false);
          break;
        default:
      }
    });
    getStatusList(eventEmitter, { entity_name: 'customers_customer' });
    return () => subscription.unsubscribe();
  }, [eventEmitter]);

  const getCustomers = useCallback(
    async data => {
      return await customerAPI.getCustomers({
        ...data,
        status: statusList.find(i => i.status_name.toLowerCase() === status)?.pk,
      });
    },
    [status, statusList],
  );

  // const handleEditClick = useCallback(({ pk }) => history.push(`/customers/${pk}`), [history]);

  const handleDeleteClick = useCallback(async ({ pk }) => {
    return await customerAPI.deleteCustomer(pk);
  }, []);

  const updateCustomer = useCallback(async data => {
    if (data.pk) return await customerAPI.updateStatus(data);
    let res = await validateCustomerData(data);
    let customer = { ...res, phone: res.phone.phone };
    delete customer['errors'];
    return await customerAPI.updateCustomer(customer);
  }, []);

  const deleteBulkRows = async selected => {
    let userList = selected.map(user => {
      return user.pk;
    });
    try {
      await customerAPI.deleteBulkCustomers(userList);
      eventEmitter.emit('SET_TOAST', { message: 'Selected users deleted successfully' });
      eventEmitter.emit('FETCH_LIST');
    } catch (e) {
      console.log(e);
      eventEmitter.emit('SET_TOAST', { message: 'Could not delete. Please try again later', color: 'status-error' });
    }}
  return (
    <Box overflow="hidden">
      <Grid
        rows={['large', 'large']}
        columns={['1/3', '2/3']}
        gap="small"
        overflow="hidden"
        areas={[
          { name: 'nav', start: [0, 1], end: [0, 1] },
          { name: 'main', start: [1, 1], end: [1, 1] },
        ]}
      >
        <Box direction="column" gap="xsmall" background="light-2" pad="medium" border="">
          <Box background="light-4" pad="medium">
            <Box
              margin={{
                left: 'xxlarge',
                right: 'xxlarge',
              }}
            >
              <Stack anchor="bottom-right">
                <Avatar
                  round="full"
                  size="14rem"
                  src="//v2.grommet.io/assets/Wilderpeople_Ricky.jpg"
                  alignSelf="centre"
                ></Avatar>
                <Box background="white" round="full" pad="medium" border={{ size: '2px', color: 'purple' }}>
                  <Edit color="brand" margin={{ top: 'medium', bottom: 'xsmall' }} anchor="top-right" />
                </Box>
              </Stack>
            </Box>
            <Text alignSelf="center" margin={{ top: 'medium', bottom: 'xsmall' }} size="27px" color="#222D39">
              Anuj Tanwar
            </Text>
            <Text color="#AFAFAF" alignSelf="center" size="17px">
              8287281540
            </Text>
            <Text color="#222D39F" alignSelf="center" size="15px">
              Gurgaon, Haryana
            </Text>
            <Box
              height="1px"
              margin={{
                top: 'medium',
              }}
              width="95%"
              background="purple"
            ></Box>
            <Box pad="medium">
              <Table>
                <TableBody>
                  <TableRow pad="medium">
                    <TableCell scope="row">
                      <strong>Employee Name</strong>
                    </TableCell>
                    <TableCell>Anuj Tanwar</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell scope="row">
                      <strong>Employee Salary</strong>
                    </TableCell>
                    <TableCell>480000</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell scope="row">
                      <strong>Employee Age</strong>
                    </TableCell>
                    <TableCell>21</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Box>
        </Box>
        <Box direction="column" gap="xsmall" pad="medium" background="light-2">
          <Tabs>
            <Box>
              <Tab title="User's List">
                <Box pad="medium">
                 
                <List
                    label={'Customer'}
                    // selectable={true}
                    queryKey="q"
                    columns={COLUMNS}
                    actionIconColor="secondary"
                    deleteHandler={handleDeleteClick}
                    fetch={getCustomers}
                    //update={updateCustomer}
                    eventEmitter={eventEmitter}
                   // searchPlaceholder="Search Customers by Name and Email ID"
                    deleteBulk={true}
                    bulkActions={[
                      // {
                      //   name: 'archive',
                      //   label: 'Archive',
                      //   icon: <Archive size="20px" />,
                      //   onClick: e => console.log('action 1', e),
                      // },
                      // {
                      //   name: 'export',
                      //   label: 'Export',
                      //   icon: <Download size="20px" />,
                      //   onClick: e => console.log('action 1', e),
                      // },
                      {
                        name: 'delete',
                        label: 'Delete',
                        icon: <Trash size="20px" />,
                        onClick: deleteBulkRows,
                      },
                    ]}
                    // filters={[
                    //   {
                    //     name: 'employee',
                    //     label: 'User',
                    //     value: '',
                    //     type: 'autocomplete',
                    //     fetch: q => searchEmployee(q),
                    //     labelKey: 'name',
                    //     valueKey: 'name',
                    //   },
                    // ]}
                    sideContent={Details}
                    status={statusList}
                    editInNewTab={true}
                    addRowOptions={{
                      colsId: ['name', 'email', 'phone'],
                      defaultObject: {
                        status: 1,
                        country_code: 'IN',
                        phone: { phone: '+91' },
                      },
                      validate: {
                        name: d => (d ? true : 'Name is required'),
                        email: d => (d ? true : 'Email is required'),
                        'phone.phone': d => (d.length > 7 && d.length < 14 ? true : 'Not a valid number'),
                      },
                      saveOn: 'phone.phone',
                    }}
                  />
                </Box>
              </Tab>
            </Box>
            <Tab title="Admin Setting">
              <Form
                value={value}
                onChange={nextValue => setValue(nextValue)}
                onSubmit={({ value }) => {
                  alert('Hello');
                }}
              >
                <Box width direction="row" gap="large" alignSelf="centre" margin={{ top: '2rem', left: '45rem' }}>
                  {' '}
                  <Box align="end" pad="medium">
                    <Button
                      primary
                      label="View Registration"
                      onClick={() => {
                        setShow(true);
                      }}
                    />
                    {show && (
                      <Layer onEsc={() => setShow(false)} onClickOutside={() => setShow(false)}>
                        <Box pad="20px">
                          <FormField name="phone" htmlFor="Phone" label="Registered Phone Number">
                            <TextInput value="8287281540" id="rPhone" disabled />
                          </FormField>
                          <FormField name="email" htmlFor="rEmail" label="Registered Email">
                            <TextInput value="user@admin.com" id="rEmail" disabled />
                          </FormField>
                          <Button label="close" onClick={() => setShow(false)} />
                        </Box>
                      </Layer>
                    )}
                  </Box>
                </Box>
                <Box direction="row" gap="large" pad="medium" margin={{ left: '2rem' }}>
                  <FormField name="userDescription" htmlFor="select" label="User Timezone">
                    <Select
                      options={['UTC', 'Asia/Kolkata', 'Australia/Sydney']}
                      name="select"
                      id="select"
                      required
                      // value={value}
                      // onChange={({ option }) => setValue(option)}
                    />
                  </FormField>
                </Box>
                <Box width="50%" margin={{ left: '2rem' }}>
                  <FormField name="userDescription" htmlFor="description" label="User Description">
                    <TextArea placeholder="type here" name="message" id="description" maxlength="5" />
                  </FormField>
                </Box>
                <Box width="50%" margin={{ left: '2rem' }}>
                  <FormField name="name" htmlFor="email" label="Admin Email">
                    <TextInput id="email" name="email" type="email" placeholder="user@admin.com" required />
                  </FormField>
                </Box>

                <Box direction="row" gap="large" alignSelf="centre" margin={{ top: '2rem', left: '24rem' }}>
                  <Button type="submit" primary label="Submit" />
                </Box>
              </Form>
            </Tab>
          </Tabs>
        </Box>
      </Grid>
    </Box>
  );
}

export default Anuj;
