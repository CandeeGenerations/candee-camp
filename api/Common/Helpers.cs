using System;
using System.Security.Cryptography;
using System.Text;

namespace Reclaimed.API.Common
{
    public class Helpers
    {
        
        public static string CreateUniqueString(int maxSize, string characters = CharactersLibrary.ALPHABETIC_CAPITAL_LOWER)
        {
            StringBuilder res = new StringBuilder();

            using (RNGCryptoServiceProvider rng = new RNGCryptoServiceProvider())
            {
                byte[] uintBuffer = new byte[sizeof(uint)];

                while (maxSize-- > 0)
                {
                    rng.GetBytes(uintBuffer);

                    uint num = BitConverter.ToUInt32(uintBuffer, 0);

                    res.Append(characters[(int) (num % (uint) characters.Length)]);
                }
            }

            return res.ToString();
        }

        public static class CharactersLibrary
        {
            public const string ALPHANUMERIC_CAPITAL_LOWER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890abcdefghijklmnopqrstuvwxyz";
            public const string ALPHANUMERIC_CAPITAL = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
            public const string ALPHANUMERIC_LOWER = "abcdefghijklmnopqrstuvwxyz1234567890";
            public const string ALPHABETIC_CAPITAL_LOWER = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
            public const string ALPHANUMERIC_CAPITAL_LOWER_SPECIAL = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890abcdefghijklmnopqrstuvwxyz!@#$%^&*()_+";
            public const string NUMERIC = "0123456789";
        }
    }
}