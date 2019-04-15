using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace WebApiStarter1.Repositories
{
    public interface IRepository<T>
    {
        //void Insert(T entity);
        //void Delete(T entity);
        //void Update(T entity);
        //IQueryable<T> SearchFor(Expression<Func<T, bool>> predicate);
        //IQueryable<T> GetAll();
        //T GetById(int id);

        void Create(T entity);
        void Delete(T entity);
        void Delete(int id);
        void Edit(T entity);

        //read side (could be in separate Readonly Generic Repository)
        T GetById(int id);
        IEnumerable<T> Filter();
        IEnumerable<T> Filter(Func<T, bool> predicate);

        //separate method SaveChanges can be helpful when using this pattern with UnitOfWork
        void SaveChanges();
    }
}
