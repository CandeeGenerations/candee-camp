using System;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Logging;

namespace CandeeCamp.Core.Api.ExceptionHandling
{
    public class GlobalExceptionFilter : IExceptionFilter, IDisposable
    {
        private readonly ILogger _logger;

        public GlobalExceptionFilter(ILoggerFactory logger)
        {
            _logger = logger?.CreateLogger("Global Exception Filter") ??
                      throw new ArgumentNullException(nameof(logger));
        }

        public void OnException(ExceptionContext context)
        {
            var response = ExceptionHelper.ProcessError(context.Exception);

            context.Result = new ObjectResult(response)
            {
                StatusCode = 500,
                DeclaredType = typeof(ExceptionModel)
            };
            
            _logger.LogError("GlobalExceptionFilter", context.Exception);
        }

        public void Dispose()
        { }
    }
}