// import java.util.Scanner;

// public class Main {
//     public static void main(String[] args) {
//         Scanner sc = new Scanner(System.in);
//         int n = sc.nextInt();
//         int[] arr = new int[n];
//         for (int i = 0; i < n; i++) {
//             arr[i] = sc.nextInt();
//         }
//         int k = sc.nextInt();

//         // Create a temporary array and store the last 'k' elements in it
//         int[] temp = new int[k];
//         for (int i = 0; i < k; i++) {
//             temp[i] = arr[n - k + i];
//         }

//         // Shift the rest of the array to the right
//         for (int i = n - 1; i >= k; i--) {
//             arr[i] = arr[i - k];
//         }

//         // Move the 'k' elements from the temporary array back to the original array
//         for (int i = 0; i < k; i++) {
//             arr[i] = temp[i];
//         }

//         // Print the rotated array
//         for (int i : arr) {
//             System.out.print(i + " ");
//         }
//     }
// }

import java.util.*;


public class Main {
    public static String fizzBuzz(int N) {
        String result;
        if (N % 3 == 0 && N % 5 == 0)
            result = "FizzBuzz";
        else if (N % 3 == 0)
            result = "Fizz";
        else if (N % 5 == 0)
            result = "Buzz";
        else
            result = Integer.toString(N);
        return result;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int N = sc.nextInt();
        sc.close();
        String output = fizzBuzz(N);
        System.out.print(output); 
    }
}
