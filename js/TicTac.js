//export class TicTac {
class TicTac {
    // time stack
    tictac = [];
    enable = true;
    tag = "TicTac";
    log = true;

    constructor() {
    }

    tic() {
        if (!this.enable) {
            return -1;
        } else {
            const tic = this.now();
            this.tictac.push(tic);
            return tic;
        }
    }

    tacL() {
        if (!this.enable) {
            return -1;
        } else {
            const tac = this.now();
            if (this.tictac.length < 1) {
                return -1; // underflow
            } else {
                const tic = this.tictac.pop();
                return tac - tic;
            }
        }
    }

    tac(msg) {
        if (!this.enable) {
            return -1;
        } else {
            const tac = this.now();
            if (this.tictac.empty()) {
                this.logError(tac, msg);
                return -1;
            } else {
                const tic = this.tictac.pop();
                sb = "";
                for (let i = 0; i < this.tictac.length; i++) {
                    sb += " ";
                }
                sb += `[${tac-tic}] : ${msg}`;
                this.logTac(sb.toString());
                return tac - tic;
            }
        }
    }

    reset() {
        this.tictac.clear();
    }

    logError(tac, msg) {
        console.log(`X_X Omitted. tic = N/A, tac = ${getTime(tac)} : ${msg}`);
    }

    logTac(msg) {
        if (this.log) {
            console.log(msg);
        }
    }

    static getTime(timeMS) {
        return new Date(timeMS).toISOString();
    }

    toString() {
        return `tictac.size() = ${this.tictac.length()}`;
    }

    now() {
        return new Date().getTime();
    }
}


// public long tic() {
//     if (!this.enable) {
//         return -1L;
//     } else {
//         long tic = System.currentTimeMillis();
//         this.tictac.push(tic);
//         return tic;
//     }
// }

// public long tacL() {
//     if (!this.enable) {
//         return -1L;
//     } else {
//         long tac = System.currentTimeMillis();
//         if (this.tictac.size() < 1) {
//             return -1L;
//         } else {
//             long tic = (Long)this.tictac.pop();
//             return tac - tic;
//         }
//     }
// }

// public long tac(String format, Object... params) {
//     return this.tac(this._fmt(format, params));
// }

// public long tac(String msg) {
//     if (!this.enable) {
//         return -1L;
//     } else {
//         long tac = System.currentTimeMillis();
//         if (this.tictac.empty()) {
//             this.logError(tac, msg);
//             return -1L;
//         } else {
//             long tic = (Long)this.tictac.pop();
//             StringBuilder sb = new StringBuilder();

//             for(int i = 0; i < this.tictac.size(); ++i) {
//                 sb.append(" ");
//             }

//             sb.append("[").append(tac - tic).append("] : ").append(msg);
//             this.logTac(sb.toString());
//             return tac - tic;
//         }
//     }
// }

// public void setLog(boolean writeLog) {
//     this.log = writeLog;
// }

// public void enable(boolean enabled) {
//     this.enable = enabled;
// }

// public void reset() {
//     this.tictac.clear();
// }

// protected void logError(long tac, String msg) {
//     if (this.log) {
//         L.log("X_X Omitted. tic = N/A, tac = %s : %s", new Object[]{this.getTime(tac), msg});
//     }

// }

// protected void logTac(String msg) {
//     if (this.log) {
//         L.log(msg);
//     }

// }

// protected String getTime(long time) {
//     return formatISO8601.format(new Date(time));
// }

// public String toString() {
//     return this._fmt("tictac.size() = %s", new Object[]{this.tictac.size()});
// }

// static {
//     formatISO8601 = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", Locale.US);
// }

//------- Valid
// class TicTac3 {
//     constructor() {
//         // time stack
//         this.tictac = [];
//         this.tag = "TicTac";
//         this.log = true;
//         this.enable = true;
//     }

//     tic() {
//         if (!this.enable) {
//             return -1;
//         } else {
//             const tic = this.now();
//             this.tictac.push(tic);
//             return tic;
//         }
//     }

//     tacL() {
//         if (!this.enable) {
//             return -1;
//         } else {
//             const tac = this.now();
//             if (this.tictac.length < 1) {
//                 return -1; // underflow
//             } else {
//                 const tic = this.tictac.pop();
//                 return tac - tic;
//             }
//         }
//     }

//     tac(msg) {
//         if (!this.enable) {
//             return -1;
//         } else {
//             const tac = this.now();
//             if (this.tictac.empty()) {
//                 this.logError(tac, msg);
//                 return -1;
//             } else {
//                 const tic = this.tictac.pop();
//                 sb = "";
//                 for (let i = 0; i < this.tictac.length; i++) {
//                     sb += " ";
//                 }
//                 sb += `[${tac-tic}] : ${msg}`;
//                 this.logTac(sb.toString());
//                 return tac - tic;
//             }
//         }
//     }

//     reset() {
//         this.tictac.clear();
//     }

//     logError(tac, msg) {
//         console.log(`X_X Omitted. tic = N/A, tac = ${getTime(tac)} : ${msg}`);
//     }

//     logTac(msg) {
//         if (this.log) {
//             console.log(msg);
//         }
//     }

//     //static
//     getTime(timeMS) {
//         return new Date(timeMS).toISOString();
//     }

//     toString() {
//         return `tictac.size() = ${this.tictac.length()}`;
//     }

//     //static
//     now() {
//         return new Date().getTime();// .currentTimeMillis;
//     }
// }