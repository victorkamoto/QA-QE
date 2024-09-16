// 1. Check if a String is a Palindrome

// Time Complexity: O(n) - The string is traversed twice: once to clean it and once to reverse it.
function isPalindromeSimple(str) {
  const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, ""); // Remove non-alphanumeric characters
  return cleaned === cleaned.split("").reverse().join("");
}
// Time Complexity: O(n) — The string is traversed once.
function isPalindromeEfficient(str) {
  const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, "");
  let left = 0,
    right = cleaned.length - 1;
  while (left < right) {
    if (cleaned[left] !== cleaned[right]) return false;
    left++;
    right--;
  }
  return true;
}
// Test cases
console.log("Testing isPalindromeSimple()");
console.log(isPalindromeSimple("A man, a plan, a canal, Panama")); // true
console.log(isPalindromeSimple("Was it a car or a cat I saw?")); // true
console.log(isPalindromeSimple("Hello, World!")); // false
console.log("Testing isPalindromeEfficient()");
console.log(isPalindromeEfficient("A man, a plan, a canal, Panama")); // true
console.log(isPalindromeEfficient("Was it a car or a cat I saw?")); // true
console.log(isPalindromeEfficient("Hello, World!")); // false

// 2. Reverse a String

// Time Complexity: O(n) — The string is split and then reversed.
function reverseStringSimple(str) {
  return str.split("").reverse().join("");
}
// Time Complexity: O(n) — The string is iterated once from end to start.
function reverseStringEfficient(str) {
  let reversed = "";
  for (let i = str.length - 1; i >= 0; i--) {
    reversed += str[i];
  }
  return reversed;
}
// Test cases
console.log("Testing reverseStringSimple()");
console.log(reverseStringSimple("Hello World")); // dlroW olleH
console.log("Testing reverseStringEfficient()");
console.log(reverseStringEfficient("Hello World")); // dlroW olleH

// 3. Find the Longest Palindromic Substring

// Time Complexity: O(n^3) — Two loops and reversing a substring for each pair.
function longestPalindromeSubstringSimple(str) {
  let longest = "";
  for (let i = 0; i < str.length; i++) {
    for (let j = i + 1; j <= str.length; j++) {
      let substr = str.substring(i, j);
      if (
        substr === substr.split("").reverse().join("") &&
        substr.length > longest.length
      ) {
        longest = substr;
      }
    }
  }
  return longest;
}
// Time Complexity: O(n^2) — Expanding from each center costs linear time.
function longestPalindromeSubstringEfficient(str) {
  let longest = "";

  function expandAroundCenter(left, right) {
    while (left >= 0 && right < str.length && str[left] === str[right]) {
      left--;
      right++;
    }
    return str.substring(left + 1, right);
  }

  for (let i = 0; i < str.length; i++) {
    let oddPalindrome = expandAroundCenter(i, i);
    let evenPalindrome = expandAroundCenter(i, i + 1);
    let longerPalindrome =
      oddPalindrome.length > evenPalindrome.length
        ? oddPalindrome
        : evenPalindrome;
    if (longerPalindrome.length > longest.length) {
      longest = longerPalindrome;
    }
  }
  return longest;
}
// Test cases
console.log("Testing longestPalindromeSubstringSimple()");
console.log(longestPalindromeSubstringSimple("babad")); // 'bab' or 'aba'
console.log(longestPalindromeSubstringSimple("cbbd")); // 'bb'
console.log("Testing longestPalindromeSubstringEfficient()");
console.log(longestPalindromeSubstringEfficient("babad")); // 'bab' or 'aba'
console.log(longestPalindromeSubstringEfficient("cbbd")); // 'bb'

// 4. Check if Two Strings are Anagrams

// Time Complexity: O(n log n) — Sorting dominates the time complexity.
function areAnagramsSimple(str1, str2) {
  const clean1 = str1.replace(/[^a-z0-9]/gi, "").toLowerCase();
  const clean2 = str2.replace(/[^a-z0-9]/gi, "").toLowerCase();
  return clean1.split("").sort().join("") === clean2.split("").sort().join("");
}
// Time Complexity: O(n) — Linear scan of both strings.
function areAnagramsEfficient(str1, str2) {
  const clean1 = str1.replace(/[^a-z0-9]/gi, "").toLowerCase();
  const clean2 = str2.replace(/[^a-z0-9]/gi, "").toLowerCase();

  if (clean1.length !== clean2.length) return false;

  const count = {};

  for (let char of clean1) {
    count[char] = (count[char] || 0) + 1;
  }

  for (let char of clean2) {
    if (!count[char]) return false;
    count[char]--;
  }

  return true;
}
// Test cases
console.log("Testing areAnagramsSimple()");
console.log(areAnagramsSimple("Listen", "Silent")); // true
console.log(areAnagramsSimple("Hello", "World")); // false
console.log("Testing areAnagramsEfficient()");
console.log(areAnagramsEfficient("Listen", "Silent")); // true
console.log(areAnagramsEfficient("Hello", "World")); // false

// 5. Remove Duplicates from a String

// Time Complexity: O(n) — Set creation takes linear time.
function removeDuplicatesSimple(str) {
  return [...new Set(str)].join("");
}
// Time Complexity: O(n) — Only one pass through the string.
function removeDuplicatesEfficient(str) {
  let result = "";
  let seen = new Set();

  for (let char of str) {
    if (!seen.has(char)) {
      result += char;
      seen.add(char);
    }
  }

  return result;
}
// Test cases
console.log("Testing removeDuplicatesSimple()");
console.log(removeDuplicatesSimple("programming")); // progamin
console.log(removeDuplicatesSimple("hello world")); // helo wrd
console.log(removeDuplicatesSimple("aaaaa")); // a
console.log(removeDuplicatesSimple("abcd")); // abcd
console.log(removeDuplicatesSimple("aabbcc")); // abc
console.log("Testing removeDuplicatesEfficient()");
console.log(removeDuplicatesEfficient("programming")); // progamin
console.log(removeDuplicatesEfficient("hello world")); // helo wrd
console.log(removeDuplicatesEfficient("aaaaa")); // a
console.log(removeDuplicatesEfficient("abcd")); // abcd
console.log(removeDuplicatesEfficient("aabbcc")); // abc

// 6. Count Palindromes in a String

// Time Complexity: O(n^3) — We check all substrings and verify if they are palindromes.
function countPalindromesSimple(str) {
  let palindromes = new Set();

  function isPalindrome(subStr) {
    return subStr === subStr.split("").reverse().join("");
  }

  for (let i = 0; i < str.length; i++) {
    for (let j = i + 1; j <= str.length; j++) {
      let substr = str.substring(i, j);
      if (isPalindrome(substr)) {
        palindromes.add(substr);
      }
    }
  }

  return palindromes.size;
}
// Time Complexity: O(n^2) — Each center expansion takes linear time.
function countPalindromesEfficient(str) {
  let palindromes = new Set();

  function expandAroundCenter(left, right) {
    while (left >= 0 && right < str.length && str[left] === str[right]) {
      palindromes.add(str.substring(left, right + 1));
      left--;
      right++;
    }
  }

  for (let i = 0; i < str.length; i++) {
    expandAroundCenter(i, i); // Odd-length palindromes
    expandAroundCenter(i, i + 1); // Even-length palindromes
  }

  return palindromes.size;
}

// Test cases
console.log("Testing countPalindromesSimple()");
console.log(countPalindromesSimple("ababa")); // 7
console.log(countPalindromesSimple("racecar")); // 7
console.log(countPalindromesSimple("aabb")); // 4
console.log(countPalindromesSimple("a")); // 1
console.log(countPalindromesSimple("abc")); // 3
console.log("Testing countPalindromesEfficient()");
console.log(countPalindromesEfficient("ababa")); // 7
console.log(countPalindromesEfficient("racecar")); // 7
console.log(countPalindromesEfficient("aabb")); // 4
console.log(countPalindromesEfficient("a")); // 1
console.log(countPalindromesEfficient("abc")); // 3

// 7. Longest Common Prefix

// Time Complexity: O(n * m) — n is the number of strings and m is the length of the common prefix.
function longestCommonPrefixSimple(arr) {
  if (arr.length === 0) return "";
  let prefix = arr[0];
  for (let i = 1; i < arr.length; i++) {
    while (arr[i].indexOf(prefix) !== 0) {
      prefix = prefix.slice(0, prefix.length - 1);
      if (prefix === "") return "";
    }
  }
  return prefix;
}
// Time Complexity: O(n * log m) — Binary search on prefix length m.
function longestCommonPrefixEfficient(arr) {
  if (arr.length === 0) return "";

  function isCommonPrefix(length) {
    let prefix = arr[0].substring(0, length);
    return arr.every((str) => str.startsWith(prefix));
  }

  let minLength = Math.min(...arr.map((str) => str.length));
  let low = 0,
    high = minLength;

  while (low <= high) {
    let mid = Math.floor((low + high) / 2);
    if (isCommonPrefix(mid)) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }
  return arr[0].substring(0, Math.floor((low + high) / 2));
}
// Test cases
console.log("Testing longestCommonPrefixSimple()");
console.log(longestCommonPrefixSimple(["flower", "flow", "flight"])); // fl
console.log(longestCommonPrefixSimple(["dog", "racecar", "car"])); // ''
console.log(
  longestCommonPrefixSimple(["interspecies", "interstellar", "interspace"])
); //
console.log(longestCommonPrefixSimple(["prefix", "prefixes", "preform"])); // pre
console.log(longestCommonPrefixSimple(["apple", "banana", "cherry"])); // ''
console.log("Testing longestCommonPrefixEfficient()");
console.log(longestCommonPrefixEfficient(["flower", "flow", "flight"])); // fl
console.log(longestCommonPrefixEfficient(["dog", "racecar", "car"])); // ''
console.log(
  longestCommonPrefixEfficient(["interspecies", "interstellar", "interspace"])
); // inters
console.log(longestCommonPrefixEfficient(["prefix", "prefixes", "preform"])); // pre
console.log(longestCommonPrefixEfficient(["apple", "banana", "cherry"])); // ''

// 8. Case Insensitive Palindrome

// Time Complexity: O(n) — The string is cleaned and reversed in linear time.
function isCaseInsensitivePalindrome(str) {
  const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, "");
  return cleaned === cleaned.split("").reverse().join("");
}
// Time Complexity: O(n) — Linear time with a single traversal of the string.
function isCaseInsensitivePalindromeEfficient(str) {
  const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, ""); // Convert to lowercase and remove non-alphanumeric characters
  let left = 0;
  let right = cleaned.length - 1;

  while (left < right) {
    if (cleaned[left] !== cleaned[right]) return false;
    left++;
    right--;
  }

  return true;
}
console.log("Testing isCaseInsensitivePalindrome()");
console.log(isCaseInsensitivePalindrome("Aba")); // true
console.log(isCaseInsensitivePalindrome("Racecar")); // true
console.log(isCaseInsensitivePalindrome("Palindrome")); // false
console.log(isCaseInsensitivePalindrome("Madam")); // true
console.log(isCaseInsensitivePalindrome("Hello")); // false
