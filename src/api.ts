import { Router } from './deps.ts';

import * as planets from './models/planets.ts';
import * as launches from './models/launches.ts';

const router = new Router();
router
  .get("/", (ctx) => {
    ctx.response.body = `
    {___     {__      {_         {__ __        {_       
    {_ {__   {__     {_ __     {__    {__     {_ __     
    {__ {__  {__    {_  {__     {__          {_  {__    
    {__  {__ {__   {__   {__      {__       {__   {__   
    {__   {_ {__  {______ {__        {__   {______ {__  
    {__    {_ __ {__       {__ {__    {__ {__       {__ 
    {__      {__{__         {__  {__ __  {__         {__
                    Mission Control API`;
  })
  .get('/planets', (ctx) => {
    ctx.response.body = planets.getAllPlanets();
  })
  .get('/launches', (ctx) => {
    ctx.response.body = launches.getAll();
  })
  .get('/launches/:id', (ctx) => {
    if (ctx.params?.id) {
      const launch = launches.getOne(Number(ctx.params.id));
      if (launch) {
        ctx.response.body = launch;
      } else {
        ctx.throw(400, "Launch with that id doesn't exist");
      }
    }
  })
  .post('/launches', async (ctx) => {
    const body = await ctx.request.body();

    launches.addOne(await body.value);

    ctx.response.body = { success: true }
    ctx.response.status = 201
  })
  .delete('/launches/:id', async (ctx) => {
    if (ctx.params?.id) {
      const result = launches.removeOne(Number(ctx.params.id));
      ctx.response.body = { success: result }
    }
  })
;

export default router;
