//using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Linq.Expressions;
using WebApiStarter1.Database;
//using System.Data.Entity;
//using MySql.Data.EntityFramework;
using CandeeCampApi.DBObjects;
using Microsoft.EntityFrameworkCore;
using System;
//using System.Data.Entity.SqlServer;

namespace WebApiStarter1.Repositories
{
    public class Repository<T> : IRepository<T> where T : class, IEntity
    {
        //protected DbSet<T> DbSet;
        protected AuthContext DataContext;

        public Repository(AuthContext dataContext)
        {
            //DbSet = dataContext.Set<T>();
            DataContext = dataContext;
        }

        public void Create(T entity)
        {
            DataContext.Set<T>().Add(entity);
            SaveChanges();
        }

        public void Delete(T entity)
        {
            //DbSet.Remove(entity);
            //DataContext.SaveChanges();
            // Add Filter command to find the entity properly
            DataContext.Set<T>().Remove(entity);
        }

        public void Delete(int id)
        {
            var entityToDelete = DataContext.Set<T>().FirstOrDefault(e => e.Id == id);
            if (entityToDelete != null)
            {
                DataContext.Set<T>().Remove(entityToDelete);
                SaveChanges();
            }
        }

        public void Edit(T entity)
        {
            DataContext.Entry(entity).State = System.Data.Entity.EntityState.Modified;
            DataContext.SaveChanges();
            //var editedEntity = DataContext.Set<T>().FirstOrDefault(e => e.Id == entity.Id);
            //editedEntity = entity;
            //DataContext.UpdateObject();
            //DataContext.Set<T>().
            //SaveChanges();
            //var eventS = DbSet.Find(entity.Id);
            //eventS.Name = entity.Name;
            //eventS.Description = entity.Description;
            //context.SaveChanges();
            //DbSet.Find(id);
            //DbSet.Update(entity);
            //DataContext.Events.up();
        }

        //public IQueryable<T> SearchFor(Expression<Func<T, bool>> predicate)
        //{
        //    return DbSet.Where(predicate);
        //}

        //public IQueryable<T> GetAll()
        //{
        //    return DbSet;
        //}

        public T GetById(int id)
        {
            // Sidenote: the == operator throws NotSupported Exception!
            // 'The Mapping of Interface Member is not supported'
            // Use .Equals() instead
            //return DbSet.Find(id);
            return DataContext.Set<T>().FirstOrDefault(e => e.Id == id);
        }

        public IEnumerable<T> Filter()
        {
            return DataContext.Set<T>();
        }

        public IEnumerable<T> Filter(Func<T, bool> predicate)
        {
            return DataContext.Set<T>().Where(predicate);
        }

        public void SaveChanges() => DataContext.SaveChanges();
    }
}