using CandeeCamp.Core.Repository;
using LightInject;

namespace CandeeCamp.Core.Api
{
    public class ApiCompositionRoot : ICompositionRoot
    {
        public void Compose(IServiceRegistry serviceRegistry)
        {
            serviceRegistry.RegisterFrom<CoreCompositionRoot>();
        }
    }
}