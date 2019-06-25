using System;

namespace CandeeCamp.API.ExceptionHandling
{
    public static class ExceptionHelper
    {
        public static ExceptionModel ProcessError(Exception ex)
        {
            return new ExceptionModel(ex.HResult, ex.Message);
        }
    }
}