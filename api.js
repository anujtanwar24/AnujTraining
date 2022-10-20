// Core Imports
import GraniteError from 'granite-admin/utils/granite-error';
import GraniteAPIClient from 'granite-admin/utils/granite-client';

// Application Imports
import CustomerEntity from 'customers/entities/customer';
import ProductEntity from 'customers/entities/product';
import ProductVariant from 'customers/entities/productVariant';

// import AddressEntity from 'granite-admin/organisations/entities/address'

/* eslint-disable */
const url = process.env.REACT_APP_CUSTOMER_BASE_URL;

async function getCustomers(params) {
  const payload = { params: { ...params } };
  try {
    const { data } = await GraniteAPIClient(url).get('/', payload);
    const list = data ? data.results?.map(item => new CustomerEntity({ mapValues: true, ...item })) : [];

    return { list, count: data.count };
  } catch (e) {
    throw new GraniteError(e);
  }
}

export default {
  getCustomers,
};