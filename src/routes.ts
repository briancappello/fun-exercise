import React from 'react';

import { About, Coinbase, ContactForm, Home, Login, SampleForm } from './pages';

export const URL_ABOUT = "/about";
export const URL_COINBASE = "/coinbase";
export const URL_CONTACT = "/contact";
export const URL_FORM = "/form";
export const URL_HOME = "/";
export const URL_LOGIN = "/login";

interface Routes {
  [key: string]: React.FC | React.ComponentClass;
}

export const routes: Routes = {
  [URL_ABOUT]: About,
  [URL_COINBASE]: Coinbase,
  [URL_CONTACT]: ContactForm,
  [URL_FORM]: SampleForm,
  [URL_HOME]: Home,
  [URL_LOGIN]: Login,
};
