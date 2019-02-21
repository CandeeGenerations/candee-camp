namespace CandeeCamp.Core.Api.ExceptionHandling
{
    public class ExceptionModel
    {
        public ExceptionModel(int code, string message)
        {
            Error = new ErrorModel
            {
                Code = code,
                Message = message
            };
        }
        
        public ErrorModel Error { get; set; }
    }

    public class ErrorModel
    {
        public int Code { get; set; }
        public string Message { get; set; }
    }
}