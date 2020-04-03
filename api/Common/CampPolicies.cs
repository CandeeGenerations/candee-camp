using System;
using System.Linq;
using System.Security.Claims;
using System.Security.Policy;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;

namespace Reclaimed.API.Common
{
    public class PortalRequirement : AuthorizationHandler<PortalRequirement>, IAuthorizationRequirement
    {
        private static Task CompletedTask => Task.FromResult(null as object);
        
        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, PortalRequirement requirement)
        {
            if (!context.User.HasClaim(x => x.Type == "portal_id"))
            {
                return Fail(context, "Token does not have the 'portal_id' claim");
            }
            
            Claim portalClaim = context.User.Claims.FirstOrDefault(x => x.Type == "portal_id");
            
            if (portalClaim == null)
            {
                return Fail(context, "Token does not have the 'portal_id' claim");
            }
            if (!int.TryParse(portalClaim.Value, out int portalId))
            {
                return Fail(context, $"Invalid portal_id claim '{portalClaim.Value}' found on user token");
            }

            if (context.Resource is Microsoft.AspNetCore.Mvc.Filters.AuthorizationFilterContext mvcContext)
            {
                if (mvcContext.RouteData.Values.ContainsKey("portalId"))
                {
                    int routePortalId = Convert.ToInt32(mvcContext.RouteData.Values["portalId"]);
                    
                    if (routePortalId != portalId)
                    {
                        return Fail(context, $"portal_id '{portalId}' claim found on token does not " +
                                             $"have access to resource portal id '{routePortalId}'");
                    }
                }                 
            }
            else
            {
                return Fail(context,
                    "Could not validate found portal_id claim against the requested resource's portal_id");
            }
            
            context.Succeed(requirement);
            
            return CompletedTask;
        }
        
        private Task Fail(AuthorizationHandlerContext context, string reason = null)
        {
            context.Fail();
            throw new PolicyException(reason);
        }
    }
    
    public class CampPolicies
    {
        public const string SamePortal = "SamePortal";
    }
}