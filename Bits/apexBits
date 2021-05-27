// Central class for code bits that you may find helpful in your own work
public class apexBits {

    /*
    @Description: Creats a random string using 0-9 numbers and A-d letters. Limited letter use it to avoid unwanted profanity in the string.
    @SOQL Queries: 0
    @Possible Modifications: Modify the "chars" string to expand the range of possible strings
    */
    public static String generateRandomString(Integer len) {
        String chars = 'ABCDabcd1234567890';
        String randStr = '';
        while (randStr.length() < len) {
           Integer idx = Math.mod(Math.abs(Crypto.getRandomInteger()), chars.length());
           randStr += chars.substring(idx, idx+1);
        }

        return randStr; 
    }

}
