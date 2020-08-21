using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Project.Domain;
using Project.Domain.Identity;
using Project.Respository;

namespace Project.Repository
{
    public class ProjectRepository : IProjectRepository
    {
        private readonly ProjectContext _context;
        public ProjectRepository(ProjectContext context)
        {
            _context = context;
            // _context.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking; aqui destravamos todos nossos recursos
        }

        //Gerais
        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }
        public void Update<T>(T entity) where T : class
        {
            _context.Update(entity);
        }
        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }
        public void DeleteRange<T>(T[] entityArray) where T : class
        {
            _context.RemoveRange(entityArray);
        }
        public async Task<bool> SaveChangesAsync()
        {
            return (await _context.SaveChangesAsync()) > 0;
        }

         public async Task<User[]> GetAllUsersAsync()
        {
            IQueryable<User> query = _context.Users;
            query = query.AsNoTracking().OrderBy(c => c.Id);
            return await query.ToArrayAsync();
        }
         public async Task<User> GetUserAsyncById(int userId)
        {
            IQueryable<User> query = _context.Users
            .Include(c => c.Clientes);
            query = query.AsNoTracking().OrderBy(c => c.Id)
            .Where(c => c.Id == userId);
            return await query.FirstOrDefaultAsync();
        }

        public async Task<Cliente[]> GetAllClientesAsync(string userId)
        {
            IQueryable<Cliente> query = _context.Clientes
            .Where(c => c.UserId == userId);
            query = query.AsNoTracking().OrderBy(c => c.ClienteId);
            return await query.ToArrayAsync();
        }
        public async Task<Cliente> GetClienteAsyncById(int clienteId)
        {
            IQueryable<Cliente> query = _context.Clientes
            .Include(c => c.Endereco);
            query = query.AsNoTracking().OrderBy(c => c. ClienteId)
            .Where(c => c.ClienteId == clienteId);
            return await query.FirstOrDefaultAsync();
        }

    }
}