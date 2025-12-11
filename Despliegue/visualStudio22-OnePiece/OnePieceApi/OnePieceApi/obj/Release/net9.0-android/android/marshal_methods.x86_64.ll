; ModuleID = 'marshal_methods.x86_64.ll'
source_filename = "marshal_methods.x86_64.ll"
target datalayout = "e-m:e-p270:32:32-p271:32:32-p272:64:64-i64:64-f80:128-n8:16:32:64-S128"
target triple = "x86_64-unknown-linux-android21"

%struct.MarshalMethodName = type {
	i64, ; uint64_t id
	ptr ; char* name
}

%struct.MarshalMethodsManagedClass = type {
	i32, ; uint32_t token
	ptr ; MonoClass klass
}

@assembly_image_cache = dso_local local_unnamed_addr global [144 x ptr] zeroinitializer, align 16

; Each entry maps hash of an assembly name to an index into the `assembly_image_cache` array
@assembly_image_cache_hashes = dso_local local_unnamed_addr constant [432 x i64] [
	i64 u0x0071cf2d27b7d61e, ; 0: lib_Xamarin.AndroidX.SwipeRefreshLayout.dll.so => 83
	i64 u0x02123411c4e01926, ; 1: lib_Xamarin.AndroidX.Navigation.Runtime.dll.so => 79
	i64 u0x022e81ea9c46e03a, ; 2: lib_CommunityToolkit.Maui.Core.dll.so => 36
	i64 u0x02abedc11addc1ed, ; 3: lib_Mono.Android.Runtime.dll.so => 142
	i64 u0x032267b2a94db371, ; 4: lib_Xamarin.AndroidX.AppCompat.dll.so => 62
	i64 u0x0363ac97a4cb84e6, ; 5: SQLitePCLRaw.provider.e_sqlite3.dll => 58
	i64 u0x043032f1d071fae0, ; 6: ru/Microsoft.Maui.Controls.resources => 24
	i64 u0x044440a55165631e, ; 7: lib-cs-Microsoft.Maui.Controls.resources.dll.so => 2
	i64 u0x046eb1581a80c6b0, ; 8: vi/Microsoft.Maui.Controls.resources => 30
	i64 u0x0517ef04e06e9f76, ; 9: System.Net.Primitives => 115
	i64 u0x0565d18c6da3de38, ; 10: Xamarin.AndroidX.RecyclerView => 81
	i64 u0x057bf9fa9fb09f7c, ; 11: Microsoft.Data.Sqlite.dll => 38
	i64 u0x0581db89237110e9, ; 12: lib_System.Collections.dll.so => 95
	i64 u0x05989cb940b225a9, ; 13: Microsoft.Maui.dll => 52
	i64 u0x05ef98b6a1db882c, ; 14: lib_Microsoft.Data.Sqlite.dll.so => 38
	i64 u0x06076b5d2b581f08, ; 15: zh-HK/Microsoft.Maui.Controls.resources => 31
	i64 u0x0680a433c781bb3d, ; 16: Xamarin.AndroidX.Collection.Jvm => 65
	i64 u0x07469f2eecce9e85, ; 17: mscorlib.dll => 138
	i64 u0x07c57877c7ba78ad, ; 18: ru/Microsoft.Maui.Controls.resources.dll => 24
	i64 u0x07dcdc7460a0c5e4, ; 19: System.Collections.NonGeneric => 93
	i64 u0x08f3c9788ee2153c, ; 20: Xamarin.AndroidX.DrawerLayout => 70
	i64 u0x0919c28b89381a0b, ; 21: lib_Microsoft.Extensions.Options.dll.so => 48
	i64 u0x092266563089ae3e, ; 22: lib_System.Collections.NonGeneric.dll.so => 93
	i64 u0x09d144a7e214d457, ; 23: System.Security.Cryptography => 128
	i64 u0x0abb3e2b271edc45, ; 24: System.Threading.Channels.dll => 132
	i64 u0x0b3b632c3bbee20c, ; 25: sk/Microsoft.Maui.Controls.resources => 25
	i64 u0x0b6aff547b84fbe9, ; 26: Xamarin.KotlinX.Serialization.Core.Jvm => 89
	i64 u0x0be2e1f8ce4064ed, ; 27: Xamarin.AndroidX.ViewPager => 84
	i64 u0x0c3ca6cc978e2aae, ; 28: pt-BR/Microsoft.Maui.Controls.resources => 21
	i64 u0x0c59ad9fbbd43abe, ; 29: Mono.Android => 143
	i64 u0x0c7790f60165fc06, ; 30: lib_Microsoft.Maui.Essentials.dll.so => 53
	i64 u0x0e14e73a54dda68e, ; 31: lib_System.Net.NameResolution.dll.so => 113
	i64 u0x102a31b45304b1da, ; 32: Xamarin.AndroidX.CustomView => 69
	i64 u0x10f6cfcbcf801616, ; 33: System.IO.Compression.Brotli => 106
	i64 u0x125b7f94acb989db, ; 34: Xamarin.AndroidX.RecyclerView.dll => 81
	i64 u0x13a01de0cbc3f06c, ; 35: lib-fr-Microsoft.Maui.Controls.resources.dll.so => 8
	i64 u0x13f1e5e209e91af4, ; 36: lib_Java.Interop.dll.so => 141
	i64 u0x13f1e880c25d96d1, ; 37: he/Microsoft.Maui.Controls.resources => 9
	i64 u0x143d8ea60a6a4011, ; 38: Microsoft.Extensions.DependencyInjection.Abstractions => 42
	i64 u0x17125c9a85b4929f, ; 39: lib_netstandard.dll.so => 139
	i64 u0x17b56e25558a5d36, ; 40: lib-hu-Microsoft.Maui.Controls.resources.dll.so => 12
	i64 u0x17f9358913beb16a, ; 41: System.Text.Encodings.Web => 129
	i64 u0x18402a709e357f3b, ; 42: lib_Xamarin.KotlinX.Serialization.Core.Jvm.dll.so => 89
	i64 u0x18f0ce884e87d89a, ; 43: nb/Microsoft.Maui.Controls.resources.dll => 18
	i64 u0x1a91866a319e9259, ; 44: lib_System.Collections.Concurrent.dll.so => 91
	i64 u0x1aac34d1917ba5d3, ; 45: lib_System.dll.so => 137
	i64 u0x1aad60783ffa3e5b, ; 46: lib-th-Microsoft.Maui.Controls.resources.dll.so => 27
	i64 u0x1c292b1598348d77, ; 47: Microsoft.Extensions.Diagnostics.dll => 43
	i64 u0x1c753b5ff15bce1b, ; 48: Mono.Android.Runtime.dll => 142
	i64 u0x1c99617273474d85, ; 49: OnePieceApi => 90
	i64 u0x1e3d87657e9659bc, ; 50: Xamarin.AndroidX.Navigation.UI => 80
	i64 u0x1e71143913d56c10, ; 51: lib-ko-Microsoft.Maui.Controls.resources.dll.so => 16
	i64 u0x1ed8fcce5e9b50a0, ; 52: Microsoft.Extensions.Options.dll => 48
	i64 u0x209375905fcc1bad, ; 53: lib_System.IO.Compression.Brotli.dll.so => 106
	i64 u0x2174319c0d835bc9, ; 54: System.Runtime => 127
	i64 u0x220fd4f2e7c48170, ; 55: th/Microsoft.Maui.Controls.resources => 27
	i64 u0x237be844f1f812c7, ; 56: System.Threading.Thread.dll => 133
	i64 u0x2407aef2bbe8fadf, ; 57: System.Console => 99
	i64 u0x240abe014b27e7d3, ; 58: Xamarin.AndroidX.Core.dll => 67
	i64 u0x252073cc3caa62c2, ; 59: fr/Microsoft.Maui.Controls.resources.dll => 8
	i64 u0x25a0a7eff76ea08e, ; 60: SQLitePCLRaw.batteries_v2.dll => 55
	i64 u0x2662c629b96b0b30, ; 61: lib_Xamarin.Kotlin.StdLib.dll.so => 87
	i64 u0x268c1439f13bcc29, ; 62: lib_Microsoft.Extensions.Primitives.dll.so => 49
	i64 u0x273f3515de5faf0d, ; 63: id/Microsoft.Maui.Controls.resources.dll => 13
	i64 u0x2742545f9094896d, ; 64: hr/Microsoft.Maui.Controls.resources => 11
	i64 u0x27b410442fad6cf1, ; 65: Java.Interop.dll => 141
	i64 u0x2801845a2c71fbfb, ; 66: System.Net.Primitives.dll => 115
	i64 u0x28e52865585a1ebe, ; 67: Microsoft.Extensions.Diagnostics.Abstractions.dll => 44
	i64 u0x2a128783efe70ba0, ; 68: uk/Microsoft.Maui.Controls.resources.dll => 29
	i64 u0x2a3b095612184159, ; 69: lib_System.Net.NetworkInformation.dll.so => 114
	i64 u0x2a6507a5ffabdf28, ; 70: System.Diagnostics.TraceSource.dll => 102
	i64 u0x2ad156c8e1354139, ; 71: fi/Microsoft.Maui.Controls.resources => 7
	i64 u0x2af298f63581d886, ; 72: System.Text.RegularExpressions.dll => 131
	i64 u0x2afc1c4f898552ee, ; 73: lib_System.Formats.Asn1.dll.so => 105
	i64 u0x2b148910ed40fbf9, ; 74: zh-Hant/Microsoft.Maui.Controls.resources.dll => 33
	i64 u0x2c8bd14bb93a7d82, ; 75: lib-pl-Microsoft.Maui.Controls.resources.dll.so => 20
	i64 u0x2d169d318a968379, ; 76: System.Threading.dll => 134
	i64 u0x2d47774b7d993f59, ; 77: sv/Microsoft.Maui.Controls.resources.dll => 26
	i64 u0x2db915caf23548d2, ; 78: System.Text.Json.dll => 130
	i64 u0x2e6f1f226821322a, ; 79: el/Microsoft.Maui.Controls.resources.dll => 5
	i64 u0x2f2e98e1c89b1aff, ; 80: System.Xml.ReaderWriter => 136
	i64 u0x2ff49de6a71764a1, ; 81: lib_Microsoft.Extensions.Http.dll.so => 45
	i64 u0x309ee9eeec09a71e, ; 82: lib_Xamarin.AndroidX.Fragment.dll.so => 71
	i64 u0x31195fef5d8fb552, ; 83: _Microsoft.Android.Resource.Designer.dll => 34
	i64 u0x32243413e774362a, ; 84: Xamarin.AndroidX.CardView.dll => 64
	i64 u0x3235427f8d12dae1, ; 85: lib_System.Drawing.Primitives.dll.so => 103
	i64 u0x329753a17a517811, ; 86: fr/Microsoft.Maui.Controls.resources => 8
	i64 u0x32aa989ff07a84ff, ; 87: lib_System.Xml.ReaderWriter.dll.so => 136
	i64 u0x33829542f112d59b, ; 88: System.Collections.Immutable => 92
	i64 u0x33a31443733849fe, ; 89: lib-es-Microsoft.Maui.Controls.resources.dll.so => 6
	i64 u0x341abc357fbb4ebf, ; 90: lib_System.Net.Sockets.dll.so => 118
	i64 u0x34dfd74fe2afcf37, ; 91: Microsoft.Maui => 52
	i64 u0x34e292762d9615df, ; 92: cs/Microsoft.Maui.Controls.resources.dll => 2
	i64 u0x3508234247f48404, ; 93: Microsoft.Maui.Controls => 50
	i64 u0x3549870798b4cd30, ; 94: lib_Xamarin.AndroidX.ViewPager2.dll.so => 85
	i64 u0x355282fc1c909694, ; 95: Microsoft.Extensions.Configuration => 39
	i64 u0x380134e03b1e160a, ; 96: System.Collections.Immutable.dll => 92
	i64 u0x385c17636bb6fe6e, ; 97: Xamarin.AndroidX.CustomView.dll => 69
	i64 u0x38869c811d74050e, ; 98: System.Net.NameResolution.dll => 113
	i64 u0x393c226616977fdb, ; 99: lib_Xamarin.AndroidX.ViewPager.dll.so => 84
	i64 u0x395e37c3334cf82a, ; 100: lib-ca-Microsoft.Maui.Controls.resources.dll.so => 1
	i64 u0x3c7c495f58ac5ee9, ; 101: Xamarin.Kotlin.StdLib => 87
	i64 u0x3d9c2a242b040a50, ; 102: lib_Xamarin.AndroidX.Core.dll.so => 67
	i64 u0x3da7781d6333a8fe, ; 103: SQLitePCLRaw.batteries_v2 => 55
	i64 u0x407a10bb4bf95829, ; 104: lib_Xamarin.AndroidX.Navigation.Common.dll.so => 77
	i64 u0x41833cf766d27d96, ; 105: mscorlib => 138
	i64 u0x41cab042be111c34, ; 106: lib_Xamarin.AndroidX.AppCompat.AppCompatResources.dll.so => 63
	i64 u0x43375950ec7c1b6a, ; 107: netstandard.dll => 139
	i64 u0x434c4e1d9284cdae, ; 108: Mono.Android.dll => 143
	i64 u0x43950f84de7cc79a, ; 109: pl/Microsoft.Maui.Controls.resources.dll => 20
	i64 u0x4515080865a951a5, ; 110: Xamarin.Kotlin.StdLib.dll => 87
	i64 u0x45c40276a42e283e, ; 111: System.Diagnostics.TraceSource => 102
	i64 u0x46a4213bc97fe5ae, ; 112: lib-ru-Microsoft.Maui.Controls.resources.dll.so => 24
	i64 u0x47daf4e1afbada10, ; 113: pt/Microsoft.Maui.Controls.resources => 22
	i64 u0x49e952f19a4e2022, ; 114: System.ObjectModel => 120
	i64 u0x4a5667b2462a664b, ; 115: lib_Xamarin.AndroidX.Navigation.UI.dll.so => 80
	i64 u0x4b7b6532ded934b7, ; 116: System.Text.Json => 130
	i64 u0x4c0192605a752911, ; 117: lib_OnePieceApi.dll.so => 90
	i64 u0x4cc5f15266470798, ; 118: lib_Xamarin.AndroidX.Loader.dll.so => 76
	i64 u0x4cf6f67dc77aacd2, ; 119: System.Net.NetworkInformation.dll => 114
	i64 u0x4d479f968a05e504, ; 120: System.Linq.Expressions.dll => 109
	i64 u0x4d55a010ffc4faff, ; 121: System.Private.Xml => 122
	i64 u0x4d95fccc1f67c7ca, ; 122: System.Runtime.Loader.dll => 125
	i64 u0x4dcf44c3c9b076a2, ; 123: it/Microsoft.Maui.Controls.resources.dll => 14
	i64 u0x4dd9247f1d2c3235, ; 124: Xamarin.AndroidX.Loader.dll => 76
	i64 u0x4e32f00cb0937401, ; 125: Mono.Android.Runtime => 142
	i64 u0x4ebd0c4b82c5eefc, ; 126: lib_System.Threading.Channels.dll.so => 132
	i64 u0x4f21ee6ef9eb527e, ; 127: ca/Microsoft.Maui.Controls.resources => 1
	i64 u0x4fd5f3ee53d0a4f0, ; 128: SQLitePCLRaw.lib.e_sqlite3.android => 57
	i64 u0x5037f0be3c28c7a3, ; 129: lib_Microsoft.Maui.Controls.dll.so => 50
	i64 u0x5112ed116d87baf8, ; 130: CommunityToolkit.Mvvm => 37
	i64 u0x5131bbe80989093f, ; 131: Xamarin.AndroidX.Lifecycle.ViewModel.Android.dll => 74
	i64 u0x51bb8a2afe774e32, ; 132: System.Drawing => 104
	i64 u0x526ce79eb8e90527, ; 133: lib_System.Net.Primitives.dll.so => 115
	i64 u0x52829f00b4467c38, ; 134: lib_System.Data.Common.dll.so => 100
	i64 u0x529ffe06f39ab8db, ; 135: Xamarin.AndroidX.Core => 67
	i64 u0x52ff996554dbf352, ; 136: Microsoft.Maui.Graphics => 54
	i64 u0x535f7e40e8fef8af, ; 137: lib-sk-Microsoft.Maui.Controls.resources.dll.so => 25
	i64 u0x53a96d5c86c9e194, ; 138: System.Net.NetworkInformation => 114
	i64 u0x53be1038a61e8d44, ; 139: System.Runtime.InteropServices.RuntimeInformation.dll => 123
	i64 u0x53c3014b9437e684, ; 140: lib-zh-HK-Microsoft.Maui.Controls.resources.dll.so => 31
	i64 u0x54795225dd1587af, ; 141: lib_System.Runtime.dll.so => 127
	i64 u0x556e8b63b660ab8b, ; 142: Xamarin.AndroidX.Lifecycle.Common.Jvm.dll => 72
	i64 u0x5588627c9a108ec9, ; 143: System.Collections.Specialized => 94
	i64 u0x571c5cfbec5ae8e2, ; 144: System.Private.Uri => 121
	i64 u0x578cd35c91d7b347, ; 145: lib_SQLitePCLRaw.core.dll.so => 56
	i64 u0x579a06fed6eec900, ; 146: System.Private.CoreLib.dll => 140
	i64 u0x57c542c14049b66d, ; 147: System.Diagnostics.DiagnosticSource => 101
	i64 u0x58601b2dda4a27b9, ; 148: lib-ja-Microsoft.Maui.Controls.resources.dll.so => 15
	i64 u0x58688d9af496b168, ; 149: Microsoft.Extensions.DependencyInjection.dll => 41
	i64 u0x5a89a886ae30258d, ; 150: lib_Xamarin.AndroidX.CoordinatorLayout.dll.so => 66
	i64 u0x5a8f6699f4a1caa9, ; 151: lib_System.Threading.dll.so => 134
	i64 u0x5ae9cd33b15841bf, ; 152: System.ComponentModel => 98
	i64 u0x5b5f0e240a06a2a2, ; 153: da/Microsoft.Maui.Controls.resources.dll => 3
	i64 u0x5c393624b8176517, ; 154: lib_Microsoft.Extensions.Logging.dll.so => 46
	i64 u0x5db0cbbd1028510e, ; 155: lib_System.Runtime.InteropServices.dll.so => 124
	i64 u0x5db30905d3e5013b, ; 156: Xamarin.AndroidX.Collection.Jvm.dll => 65
	i64 u0x5e467bc8f09ad026, ; 157: System.Collections.Specialized.dll => 94
	i64 u0x5ea92fdb19ec8c4c, ; 158: System.Text.Encodings.Web.dll => 129
	i64 u0x5eb8046dd40e9ac3, ; 159: System.ComponentModel.Primitives => 96
	i64 u0x5f36ccf5c6a57e24, ; 160: System.Xml.ReaderWriter.dll => 136
	i64 u0x5f4294b9b63cb842, ; 161: System.Data.Common => 100
	i64 u0x5f7399e166075632, ; 162: lib_SQLitePCLRaw.lib.e_sqlite3.android.dll.so => 57
	i64 u0x5f9a2d823f664957, ; 163: lib-el-Microsoft.Maui.Controls.resources.dll.so => 5
	i64 u0x609f4b7b63d802d4, ; 164: lib_Microsoft.Extensions.DependencyInjection.dll.so => 41
	i64 u0x60cd4e33d7e60134, ; 165: Xamarin.KotlinX.Coroutines.Core.Jvm => 88
	i64 u0x60f62d786afcf130, ; 166: System.Memory => 111
	i64 u0x61be8d1299194243, ; 167: Microsoft.Maui.Controls.Xaml => 51
	i64 u0x61d2cba29557038f, ; 168: de/Microsoft.Maui.Controls.resources => 4
	i64 u0x61d88f399afb2f45, ; 169: lib_System.Runtime.Loader.dll.so => 125
	i64 u0x622eef6f9e59068d, ; 170: System.Private.CoreLib => 140
	i64 u0x63f1f6883c1e23c2, ; 171: lib_System.Collections.Immutable.dll.so => 92
	i64 u0x6400f68068c1e9f1, ; 172: Xamarin.Google.Android.Material.dll => 86
	i64 u0x658f524e4aba7dad, ; 173: CommunityToolkit.Maui.dll => 35
	i64 u0x65ecac39144dd3cc, ; 174: Microsoft.Maui.Controls.dll => 50
	i64 u0x65ece51227bfa724, ; 175: lib_System.Runtime.Numerics.dll.so => 126
	i64 u0x6692e924eade1b29, ; 176: lib_System.Console.dll.so => 99
	i64 u0x66a4e5c6a3fb0bae, ; 177: lib_Xamarin.AndroidX.Lifecycle.ViewModel.Android.dll.so => 74
	i64 u0x66d13304ce1a3efa, ; 178: Xamarin.AndroidX.CursorAdapter => 68
	i64 u0x68558ec653afa616, ; 179: lib-da-Microsoft.Maui.Controls.resources.dll.so => 3
	i64 u0x6872ec7a2e36b1ac, ; 180: System.Drawing.Primitives.dll => 103
	i64 u0x68fbbbe2eb455198, ; 181: System.Formats.Asn1 => 105
	i64 u0x69063fc0ba8e6bdd, ; 182: he/Microsoft.Maui.Controls.resources.dll => 9
	i64 u0x699dffb2427a2d71, ; 183: SQLitePCLRaw.lib.e_sqlite3.android.dll => 57
	i64 u0x6a4d7577b2317255, ; 184: System.Runtime.InteropServices.dll => 124
	i64 u0x6ace3b74b15ee4a4, ; 185: nb/Microsoft.Maui.Controls.resources => 18
	i64 u0x6d12bfaa99c72b1f, ; 186: lib_Microsoft.Maui.Graphics.dll.so => 54
	i64 u0x6d79993361e10ef2, ; 187: Microsoft.Extensions.Primitives => 49
	i64 u0x6d86d56b84c8eb71, ; 188: lib_Xamarin.AndroidX.CursorAdapter.dll.so => 68
	i64 u0x6d9bea6b3e895cf7, ; 189: Microsoft.Extensions.Primitives.dll => 49
	i64 u0x6e25a02c3833319a, ; 190: lib_Xamarin.AndroidX.Navigation.Fragment.dll.so => 78
	i64 u0x6fd2265da78b93a4, ; 191: lib_Microsoft.Maui.dll.so => 52
	i64 u0x6fdfc7de82c33008, ; 192: cs/Microsoft.Maui.Controls.resources => 2
	i64 u0x70e99f48c05cb921, ; 193: tr/Microsoft.Maui.Controls.resources.dll => 28
	i64 u0x70fd3deda22442d2, ; 194: lib-nb-Microsoft.Maui.Controls.resources.dll.so => 18
	i64 u0x717530326f808838, ; 195: lib_Microsoft.Extensions.Diagnostics.Abstractions.dll.so => 44
	i64 u0x71a495ea3761dde8, ; 196: lib-it-Microsoft.Maui.Controls.resources.dll.so => 14
	i64 u0x71ad672adbe48f35, ; 197: System.ComponentModel.Primitives.dll => 96
	i64 u0x72b1fb4109e08d7b, ; 198: lib-hr-Microsoft.Maui.Controls.resources.dll.so => 11
	i64 u0x73e4ce94e2eb6ffc, ; 199: lib_System.Memory.dll.so => 111
	i64 u0x746cf89b511b4d40, ; 200: lib_Microsoft.Extensions.Diagnostics.dll.so => 43
	i64 u0x755a91767330b3d4, ; 201: lib_Microsoft.Extensions.Configuration.dll.so => 39
	i64 u0x76012e7334db86e5, ; 202: lib_Xamarin.AndroidX.SavedState.dll.so => 82
	i64 u0x76ca07b878f44da0, ; 203: System.Runtime.Numerics.dll => 126
	i64 u0x780bc73597a503a9, ; 204: lib-ms-Microsoft.Maui.Controls.resources.dll.so => 17
	i64 u0x783606d1e53e7a1a, ; 205: th/Microsoft.Maui.Controls.resources.dll => 27
	i64 u0x78a45e51311409b6, ; 206: Xamarin.AndroidX.Fragment.dll => 71
	i64 u0x7a25bdb29108c6e7, ; 207: Microsoft.Extensions.Http => 45
	i64 u0x7adb8da2ac89b647, ; 208: fi/Microsoft.Maui.Controls.resources.dll => 7
	i64 u0x7b150145c0a9058c, ; 209: Microsoft.Data.Sqlite => 38
	i64 u0x7bef86a4335c4870, ; 210: System.ComponentModel.TypeConverter => 97
	i64 u0x7c0820144cd34d6a, ; 211: sk/Microsoft.Maui.Controls.resources.dll => 25
	i64 u0x7c2a0bd1e0f988fc, ; 212: lib-de-Microsoft.Maui.Controls.resources.dll.so => 4
	i64 u0x7cc637f941f716d0, ; 213: CommunityToolkit.Maui.Core => 36
	i64 u0x7d649b75d580bb42, ; 214: ms/Microsoft.Maui.Controls.resources.dll => 17
	i64 u0x7d8ee2bdc8e3aad1, ; 215: System.Numerics.Vectors => 119
	i64 u0x7dfc3d6d9d8d7b70, ; 216: System.Collections => 95
	i64 u0x7e946809d6008ef2, ; 217: lib_System.ObjectModel.dll.so => 120
	i64 u0x7ecc13347c8fd849, ; 218: lib_System.ComponentModel.dll.so => 98
	i64 u0x7f00ddd9b9ca5a13, ; 219: Xamarin.AndroidX.ViewPager.dll => 84
	i64 u0x7f9351cd44b1273f, ; 220: Microsoft.Extensions.Configuration.Abstractions => 40
	i64 u0x7fbd557c99b3ce6f, ; 221: lib_Xamarin.AndroidX.Lifecycle.LiveData.Core.dll.so => 73
	i64 u0x80fa55b6d1b0be99, ; 222: SQLitePCLRaw.provider.e_sqlite3 => 58
	i64 u0x812c069d5cdecc17, ; 223: System.dll => 137
	i64 u0x81ab745f6c0f5ce6, ; 224: zh-Hant/Microsoft.Maui.Controls.resources => 33
	i64 u0x8277f2be6b5ce05f, ; 225: Xamarin.AndroidX.AppCompat => 62
	i64 u0x828f06563b30bc50, ; 226: lib_Xamarin.AndroidX.CardView.dll.so => 64
	i64 u0x82df8f5532a10c59, ; 227: lib_System.Drawing.dll.so => 104
	i64 u0x82f6403342e12049, ; 228: uk/Microsoft.Maui.Controls.resources => 29
	i64 u0x83c14ba66c8e2b8c, ; 229: zh-Hans/Microsoft.Maui.Controls.resources => 32
	i64 u0x86a909228dc7657b, ; 230: lib-zh-Hant-Microsoft.Maui.Controls.resources.dll.so => 33
	i64 u0x86b3e00c36b84509, ; 231: Microsoft.Extensions.Configuration.dll => 39
	i64 u0x87c69b87d9283884, ; 232: lib_System.Threading.Thread.dll.so => 133
	i64 u0x87f6569b25707834, ; 233: System.IO.Compression.Brotli.dll => 106
	i64 u0x8842b3a5d2d3fb36, ; 234: Microsoft.Maui.Essentials => 53
	i64 u0x88bda98e0cffb7a9, ; 235: lib_Xamarin.KotlinX.Coroutines.Core.Jvm.dll.so => 88
	i64 u0x8930322c7bd8f768, ; 236: netstandard => 139
	i64 u0x897a606c9e39c75f, ; 237: lib_System.ComponentModel.Primitives.dll.so => 96
	i64 u0x89c5188089ec2cd5, ; 238: lib_System.Runtime.InteropServices.RuntimeInformation.dll.so => 123
	i64 u0x8ad229ea26432ee2, ; 239: Xamarin.AndroidX.Loader => 76
	i64 u0x8b4ff5d0fdd5faa1, ; 240: lib_System.Diagnostics.DiagnosticSource.dll.so => 101
	i64 u0x8b9ceca7acae3451, ; 241: lib-he-Microsoft.Maui.Controls.resources.dll.so => 9
	i64 u0x8d0f420977c2c1c7, ; 242: Xamarin.AndroidX.CursorAdapter.dll => 68
	i64 u0x8d7b8ab4b3310ead, ; 243: System.Threading => 134
	i64 u0x8da188285aadfe8e, ; 244: System.Collections.Concurrent => 91
	i64 u0x8e623fec9635e28f, ; 245: Syncfusion.Maui.Toolkit.resources.dll => 60
	i64 u0x8ed807bfe9858dfc, ; 246: Xamarin.AndroidX.Navigation.Common => 77
	i64 u0x8ee08b8194a30f48, ; 247: lib-hi-Microsoft.Maui.Controls.resources.dll.so => 10
	i64 u0x8ef7601039857a44, ; 248: lib-ro-Microsoft.Maui.Controls.resources.dll.so => 23
	i64 u0x8ef9414937d93a0a, ; 249: SQLitePCLRaw.core.dll => 56
	i64 u0x8f32c6f611f6ffab, ; 250: pt/Microsoft.Maui.Controls.resources.dll => 22
	i64 u0x8f8829d21c8985a4, ; 251: lib-pt-BR-Microsoft.Maui.Controls.resources.dll.so => 21
	i64 u0x8fd27d934d7b3a55, ; 252: SQLitePCLRaw.core => 56
	i64 u0x90263f8448b8f572, ; 253: lib_System.Diagnostics.TraceSource.dll.so => 102
	i64 u0x903101b46fb73a04, ; 254: _Microsoft.Android.Resource.Designer => 34
	i64 u0x90393bd4865292f3, ; 255: lib_System.IO.Compression.dll.so => 107
	i64 u0x90634f86c5ebe2b5, ; 256: Xamarin.AndroidX.Lifecycle.ViewModel.Android => 74
	i64 u0x907b636704ad79ef, ; 257: lib_Microsoft.Maui.Controls.Xaml.dll.so => 51
	i64 u0x91418dc638b29e68, ; 258: lib_Xamarin.AndroidX.CustomView.dll.so => 69
	i64 u0x9157bd523cd7ed36, ; 259: lib_System.Text.Json.dll.so => 130
	i64 u0x91a74f07b30d37e2, ; 260: System.Linq.dll => 110
	i64 u0x91fa41a87223399f, ; 261: ca/Microsoft.Maui.Controls.resources.dll => 1
	i64 u0x92dd6c6033393bf7, ; 262: Syncfusion.Maui.Toolkit.resources => 60
	i64 u0x93cfa73ab28d6e35, ; 263: ms/Microsoft.Maui.Controls.resources => 17
	i64 u0x944077d8ca3c6580, ; 264: System.IO.Compression.dll => 107
	i64 u0x967fc325e09bfa8c, ; 265: es/Microsoft.Maui.Controls.resources => 6
	i64 u0x9732d8dbddea3d9a, ; 266: id/Microsoft.Maui.Controls.resources => 13
	i64 u0x978be80e5210d31b, ; 267: Microsoft.Maui.Graphics.dll => 54
	i64 u0x97b8c771ea3e4220, ; 268: System.ComponentModel.dll => 98
	i64 u0x97e144c9d3c6976e, ; 269: System.Collections.Concurrent.dll => 91
	i64 u0x991d510397f92d9d, ; 270: System.Linq.Expressions => 109
	i64 u0x999cb19e1a04ffd3, ; 271: CommunityToolkit.Mvvm.dll => 37
	i64 u0x99a00ca5270c6878, ; 272: Xamarin.AndroidX.Navigation.Runtime => 79
	i64 u0x99cdc6d1f2d3a72f, ; 273: ko/Microsoft.Maui.Controls.resources.dll => 16
	i64 u0x9d5dbcf5a48583fe, ; 274: lib_Xamarin.AndroidX.Activity.dll.so => 61
	i64 u0x9d74dee1a7725f34, ; 275: Microsoft.Extensions.Configuration.Abstractions.dll => 40
	i64 u0x9e4534b6adaf6e84, ; 276: nl/Microsoft.Maui.Controls.resources => 19
	i64 u0x9eaf1efdf6f7267e, ; 277: Xamarin.AndroidX.Navigation.Common.dll => 77
	i64 u0x9ef542cf1f78c506, ; 278: Xamarin.AndroidX.Lifecycle.LiveData.Core => 73
	i64 u0xa0d8259f4cc284ec, ; 279: lib_System.Security.Cryptography.dll.so => 128
	i64 u0xa1440773ee9d341e, ; 280: Xamarin.Google.Android.Material => 86
	i64 u0xa1b9d7c27f47219f, ; 281: Xamarin.AndroidX.Navigation.UI.dll => 80
	i64 u0xa2572680829d2c7c, ; 282: System.IO.Pipelines.dll => 108
	i64 u0xa308401900e5bed3, ; 283: lib_mscorlib.dll.so => 138
	i64 u0xa46aa1eaa214539b, ; 284: ko/Microsoft.Maui.Controls.resources => 16
	i64 u0xa4a372eecb9e4df0, ; 285: Microsoft.Extensions.Diagnostics => 43
	i64 u0xa4d20d2ff0563d26, ; 286: lib_CommunityToolkit.Mvvm.dll.so => 37
	i64 u0xa4edc8f2ceae241a, ; 287: System.Data.Common.dll => 100
	i64 u0xa5e599d1e0524750, ; 288: System.Numerics.Vectors.dll => 119
	i64 u0xa5f1ba49b85dd355, ; 289: System.Security.Cryptography.dll => 128
	i64 u0xa67dbee13e1df9ca, ; 290: Xamarin.AndroidX.SavedState.dll => 82
	i64 u0xa68a420042bb9b1f, ; 291: Xamarin.AndroidX.DrawerLayout.dll => 70
	i64 u0xa78ce3745383236a, ; 292: Xamarin.AndroidX.Lifecycle.Common.Jvm => 72
	i64 u0xa7c31b56b4dc7b33, ; 293: hu/Microsoft.Maui.Controls.resources => 12
	i64 u0xa964304b5631e28a, ; 294: CommunityToolkit.Maui.Core.dll => 36
	i64 u0xaa2219c8e3449ff5, ; 295: Microsoft.Extensions.Logging.Abstractions => 47
	i64 u0xaa443ac34067eeef, ; 296: System.Private.Xml.dll => 122
	i64 u0xaa52de307ef5d1dd, ; 297: System.Net.Http => 112
	i64 u0xaaaf86367285a918, ; 298: Microsoft.Extensions.DependencyInjection.Abstractions.dll => 42
	i64 u0xaaf84bb3f052a265, ; 299: el/Microsoft.Maui.Controls.resources => 5
	i64 u0xab9c1b2687d86b0b, ; 300: lib_System.Linq.Expressions.dll.so => 109
	i64 u0xac2af3fa195a15ce, ; 301: System.Runtime.Numerics => 126
	i64 u0xac5376a2a538dc10, ; 302: Xamarin.AndroidX.Lifecycle.LiveData.Core.dll => 73
	i64 u0xacd46e002c3ccb97, ; 303: ro/Microsoft.Maui.Controls.resources => 23
	i64 u0xacf42eea7ef9cd12, ; 304: System.Threading.Channels => 132
	i64 u0xad89c07347f1bad6, ; 305: nl/Microsoft.Maui.Controls.resources.dll => 19
	i64 u0xadbb53caf78a79d2, ; 306: System.Web.HttpUtility => 135
	i64 u0xadc90ab061a9e6e4, ; 307: System.ComponentModel.TypeConverter.dll => 97
	i64 u0xadf511667bef3595, ; 308: System.Net.Security => 117
	i64 u0xae282bcd03739de7, ; 309: Java.Interop => 141
	i64 u0xae53579c90db1107, ; 310: System.ObjectModel.dll => 120
	i64 u0xaf4829c0b3e740ae, ; 311: lib_Syncfusion.Maui.Toolkit.resources.dll.so => 60
	i64 u0xafe29f45095518e7, ; 312: lib_Xamarin.AndroidX.Lifecycle.ViewModelSavedState.dll.so => 75
	i64 u0xb05cc42cd94c6d9d, ; 313: lib-sv-Microsoft.Maui.Controls.resources.dll.so => 26
	i64 u0xb220631954820169, ; 314: System.Text.RegularExpressions => 131
	i64 u0xb2a3f67f3bf29fce, ; 315: da/Microsoft.Maui.Controls.resources => 3
	i64 u0xb3f0a0fcda8d3ebc, ; 316: Xamarin.AndroidX.CardView => 64
	i64 u0xb46be1aa6d4fff93, ; 317: hi/Microsoft.Maui.Controls.resources => 10
	i64 u0xb477491be13109d8, ; 318: ar/Microsoft.Maui.Controls.resources => 0
	i64 u0xb4bd7015ecee9d86, ; 319: System.IO.Pipelines => 108
	i64 u0xb5c7fcdafbc67ee4, ; 320: Microsoft.Extensions.Logging.Abstractions.dll => 47
	i64 u0xb7212c4683a94afe, ; 321: System.Drawing.Primitives => 103
	i64 u0xb7b7753d1f319409, ; 322: sv/Microsoft.Maui.Controls.resources => 26
	i64 u0xb81a2c6e0aee50fe, ; 323: lib_System.Private.CoreLib.dll.so => 140
	i64 u0xb872c26142d22aa9, ; 324: Microsoft.Extensions.Http.dll => 45
	i64 u0xb9f64d3b230def68, ; 325: lib-pt-Microsoft.Maui.Controls.resources.dll.so => 22
	i64 u0xb9fc3c8a556e3691, ; 326: ja/Microsoft.Maui.Controls.resources => 15
	i64 u0xba48785529705af9, ; 327: System.Collections.dll => 95
	i64 u0xbb65706fde942ce3, ; 328: System.Net.Sockets => 118
	i64 u0xbc22a245dab70cb4, ; 329: lib_SQLitePCLRaw.provider.e_sqlite3.dll.so => 58
	i64 u0xbd0e2c0d55246576, ; 330: System.Net.Http.dll => 112
	i64 u0xbd437a2cdb333d0d, ; 331: Xamarin.AndroidX.ViewPager2 => 85
	i64 u0xbee38d4a88835966, ; 332: Xamarin.AndroidX.AppCompat.AppCompatResources => 63
	i64 u0xc040a4ab55817f58, ; 333: ar/Microsoft.Maui.Controls.resources.dll => 0
	i64 u0xc0d928351ab5ca77, ; 334: System.Console.dll => 99
	i64 u0xc12b8b3afa48329c, ; 335: lib_System.Linq.dll.so => 110
	i64 u0xc1347413e524ff69, ; 336: lib_Syncfusion.Maui.Toolkit.dll.so => 59
	i64 u0xc1ff9ae3cdb6e1e6, ; 337: Xamarin.AndroidX.Activity.dll => 61
	i64 u0xc28c50f32f81cc73, ; 338: ja/Microsoft.Maui.Controls.resources.dll => 15
	i64 u0xc2bcfec99f69365e, ; 339: Xamarin.AndroidX.ViewPager2.dll => 85
	i64 u0xc4d3858ed4d08512, ; 340: Xamarin.AndroidX.Lifecycle.ViewModelSavedState.dll => 75
	i64 u0xc50fded0ded1418c, ; 341: lib_System.ComponentModel.TypeConverter.dll.so => 97
	i64 u0xc519125d6bc8fb11, ; 342: lib_System.Net.Requests.dll.so => 116
	i64 u0xc5293b19e4dc230e, ; 343: Xamarin.AndroidX.Navigation.Fragment => 78
	i64 u0xc5325b2fcb37446f, ; 344: lib_System.Private.Xml.dll.so => 122
	i64 u0xc5a0f4b95a699af7, ; 345: lib_System.Private.Uri.dll.so => 121
	i64 u0xc7ce851898a4548e, ; 346: lib_System.Web.HttpUtility.dll.so => 135
	i64 u0xc858a28d9ee5a6c5, ; 347: lib_System.Collections.Specialized.dll.so => 94
	i64 u0xc9e54b32fc19baf3, ; 348: lib_CommunityToolkit.Maui.dll.so => 35
	i64 u0xca3a723e7342c5b6, ; 349: lib-tr-Microsoft.Maui.Controls.resources.dll.so => 28
	i64 u0xcab3493c70141c2d, ; 350: pl/Microsoft.Maui.Controls.resources => 20
	i64 u0xcacfddc9f7c6de76, ; 351: ro/Microsoft.Maui.Controls.resources.dll => 23
	i64 u0xcbd4fdd9cef4a294, ; 352: lib__Microsoft.Android.Resource.Designer.dll.so => 34
	i64 u0xcc2876b32ef2794c, ; 353: lib_System.Text.RegularExpressions.dll.so => 131
	i64 u0xcc5c3bb714c4561e, ; 354: Xamarin.KotlinX.Coroutines.Core.Jvm.dll => 88
	i64 u0xcc76886e09b88260, ; 355: Xamarin.KotlinX.Serialization.Core.Jvm.dll => 89
	i64 u0xccf25c4b634ccd3a, ; 356: zh-Hans/Microsoft.Maui.Controls.resources.dll => 32
	i64 u0xcd10a42808629144, ; 357: System.Net.Requests => 116
	i64 u0xcdd0c48b6937b21c, ; 358: Xamarin.AndroidX.SwipeRefreshLayout => 83
	i64 u0xcf23d8093f3ceadf, ; 359: System.Diagnostics.DiagnosticSource.dll => 101
	i64 u0xd1194e1d8a8de83c, ; 360: lib_Xamarin.AndroidX.Lifecycle.Common.Jvm.dll.so => 72
	i64 u0xd16fd7fb9bbcd43e, ; 361: Microsoft.Extensions.Diagnostics.Abstractions => 44
	i64 u0xd333d0af9e423810, ; 362: System.Runtime.InteropServices => 124
	i64 u0xd3426d966bb704f5, ; 363: Xamarin.AndroidX.AppCompat.AppCompatResources.dll => 63
	i64 u0xd3651b6fc3125825, ; 364: System.Private.Uri.dll => 121
	i64 u0xd373685349b1fe8b, ; 365: Microsoft.Extensions.Logging.dll => 46
	i64 u0xd3e4c8d6a2d5d470, ; 366: it/Microsoft.Maui.Controls.resources => 14
	i64 u0xd4645626dffec99d, ; 367: lib_Microsoft.Extensions.DependencyInjection.Abstractions.dll.so => 42
	i64 u0xd5507e11a2b2839f, ; 368: Xamarin.AndroidX.Lifecycle.ViewModelSavedState => 75
	i64 u0xd6694f8359737e4e, ; 369: Xamarin.AndroidX.SavedState => 82
	i64 u0xd6d21782156bc35b, ; 370: Xamarin.AndroidX.SwipeRefreshLayout.dll => 83
	i64 u0xd72329819cbbbc44, ; 371: lib_Microsoft.Extensions.Configuration.Abstractions.dll.so => 40
	i64 u0xd7b3764ada9d341d, ; 372: lib_Microsoft.Extensions.Logging.Abstractions.dll.so => 47
	i64 u0xda1dfa4c534a9251, ; 373: Microsoft.Extensions.DependencyInjection => 41
	i64 u0xdad05a11827959a3, ; 374: System.Collections.NonGeneric.dll => 93
	i64 u0xdb5383ab5865c007, ; 375: lib-vi-Microsoft.Maui.Controls.resources.dll.so => 30
	i64 u0xdbeda89f832aa805, ; 376: vi/Microsoft.Maui.Controls.resources.dll => 30
	i64 u0xdbf9607a441b4505, ; 377: System.Linq => 110
	i64 u0xdce2c53525640bf3, ; 378: Microsoft.Extensions.Logging => 46
	i64 u0xdd2b722d78ef5f43, ; 379: System.Runtime.dll => 127
	i64 u0xdd67031857c72f96, ; 380: lib_System.Text.Encodings.Web.dll.so => 129
	i64 u0xdde30e6b77aa6f6c, ; 381: lib-zh-Hans-Microsoft.Maui.Controls.resources.dll.so => 32
	i64 u0xde8769ebda7d8647, ; 382: hr/Microsoft.Maui.Controls.resources.dll => 11
	i64 u0xe0142572c095a480, ; 383: Xamarin.AndroidX.AppCompat.dll => 62
	i64 u0xe020c74e3723dc6f, ; 384: Syncfusion.Maui.Toolkit.dll => 59
	i64 u0xe02f89350ec78051, ; 385: Xamarin.AndroidX.CoordinatorLayout.dll => 66
	i64 u0xe192a588d4410686, ; 386: lib_System.IO.Pipelines.dll.so => 108
	i64 u0xe1a08bd3fa539e0d, ; 387: System.Runtime.Loader => 125
	i64 u0xe1ecfdb7fff86067, ; 388: System.Net.Security.dll => 117
	i64 u0xe2420585aeceb728, ; 389: System.Net.Requests.dll => 116
	i64 u0xe29b73bc11392966, ; 390: lib-id-Microsoft.Maui.Controls.resources.dll.so => 13
	i64 u0xe3811d68d4fe8463, ; 391: pt-BR/Microsoft.Maui.Controls.resources.dll => 21
	i64 u0xe494f7ced4ecd10a, ; 392: hu/Microsoft.Maui.Controls.resources.dll => 12
	i64 u0xe4a9b1e40d1e8917, ; 393: lib-fi-Microsoft.Maui.Controls.resources.dll.so => 7
	i64 u0xe5434e8a119ceb69, ; 394: lib_Mono.Android.dll.so => 143
	i64 u0xe89a2a9ef110899b, ; 395: System.Drawing.dll => 104
	i64 u0xea008206567504c4, ; 396: Syncfusion.Maui.Toolkit => 59
	i64 u0xedc4817167106c23, ; 397: System.Net.Sockets.dll => 118
	i64 u0xedc632067fb20ff3, ; 398: System.Memory.dll => 111
	i64 u0xedc8e4ca71a02a8b, ; 399: Xamarin.AndroidX.Navigation.Runtime.dll => 79
	i64 u0xeeb7ebb80150501b, ; 400: lib_Xamarin.AndroidX.Collection.Jvm.dll.so => 65
	i64 u0xef72742e1bcca27a, ; 401: Microsoft.Maui.Essentials.dll => 53
	i64 u0xefec0b7fdc57ec42, ; 402: Xamarin.AndroidX.Activity => 61
	i64 u0xf00c29406ea45e19, ; 403: es/Microsoft.Maui.Controls.resources.dll => 6
	i64 u0xf09e47b6ae914f6e, ; 404: System.Net.NameResolution => 113
	i64 u0xf11b621fc87b983f, ; 405: Microsoft.Maui.Controls.Xaml.dll => 51
	i64 u0xf1c4b4005493d871, ; 406: System.Formats.Asn1.dll => 105
	i64 u0xf238bd79489d3a96, ; 407: lib-nl-Microsoft.Maui.Controls.resources.dll.so => 19
	i64 u0xf37221fda4ef8830, ; 408: lib_Xamarin.Google.Android.Material.dll.so => 86
	i64 u0xf3ddfe05336abf29, ; 409: System => 137
	i64 u0xf4c1dd70a5496a17, ; 410: System.IO.Compression => 107
	i64 u0xf5fc826809bcf1ed, ; 411: OnePieceApi.dll => 90
	i64 u0xf6077741019d7428, ; 412: Xamarin.AndroidX.CoordinatorLayout => 66
	i64 u0xf77b20923f07c667, ; 413: de/Microsoft.Maui.Controls.resources.dll => 4
	i64 u0xf7e2cac4c45067b3, ; 414: lib_System.Numerics.Vectors.dll.so => 119
	i64 u0xf7e74930e0e3d214, ; 415: zh-HK/Microsoft.Maui.Controls.resources.dll => 31
	i64 u0xf84773b5c81e3cef, ; 416: lib-uk-Microsoft.Maui.Controls.resources.dll.so => 29
	i64 u0xf8e045dc345b2ea3, ; 417: lib_Xamarin.AndroidX.RecyclerView.dll.so => 81
	i64 u0xf915dc29808193a1, ; 418: System.Web.HttpUtility.dll => 135
	i64 u0xf96c777a2a0686f4, ; 419: hi/Microsoft.Maui.Controls.resources.dll => 10
	i64 u0xf9eec5bb3a6aedc6, ; 420: Microsoft.Extensions.Options => 48
	i64 u0xfa3f278f288b0e84, ; 421: lib_System.Net.Security.dll.so => 117
	i64 u0xfa5ed7226d978949, ; 422: lib-ar-Microsoft.Maui.Controls.resources.dll.so => 0
	i64 u0xfa645d91e9fc4cba, ; 423: System.Threading.Thread => 133
	i64 u0xfb022853d73b7fa5, ; 424: lib_SQLitePCLRaw.batteries_v2.dll.so => 55
	i64 u0xfbf0a31c9fc34bc4, ; 425: lib_System.Net.Http.dll.so => 112
	i64 u0xfc719aec26adf9d9, ; 426: Xamarin.AndroidX.Navigation.Fragment.dll => 78
	i64 u0xfd22f00870e40ae0, ; 427: lib_Xamarin.AndroidX.DrawerLayout.dll.so => 70
	i64 u0xfd49b3c1a76e2748, ; 428: System.Runtime.InteropServices.RuntimeInformation => 123
	i64 u0xfd583f7657b6a1cb, ; 429: Xamarin.AndroidX.Fragment => 71
	i64 u0xfdbe4710aa9beeff, ; 430: CommunityToolkit.Maui => 35
	i64 u0xfeae9952cf03b8cb ; 431: tr/Microsoft.Maui.Controls.resources => 28
], align 16

@assembly_image_cache_indices = dso_local local_unnamed_addr constant [432 x i32] [
	i32 83, i32 79, i32 36, i32 142, i32 62, i32 58, i32 24, i32 2,
	i32 30, i32 115, i32 81, i32 38, i32 95, i32 52, i32 38, i32 31,
	i32 65, i32 138, i32 24, i32 93, i32 70, i32 48, i32 93, i32 128,
	i32 132, i32 25, i32 89, i32 84, i32 21, i32 143, i32 53, i32 113,
	i32 69, i32 106, i32 81, i32 8, i32 141, i32 9, i32 42, i32 139,
	i32 12, i32 129, i32 89, i32 18, i32 91, i32 137, i32 27, i32 43,
	i32 142, i32 90, i32 80, i32 16, i32 48, i32 106, i32 127, i32 27,
	i32 133, i32 99, i32 67, i32 8, i32 55, i32 87, i32 49, i32 13,
	i32 11, i32 141, i32 115, i32 44, i32 29, i32 114, i32 102, i32 7,
	i32 131, i32 105, i32 33, i32 20, i32 134, i32 26, i32 130, i32 5,
	i32 136, i32 45, i32 71, i32 34, i32 64, i32 103, i32 8, i32 136,
	i32 92, i32 6, i32 118, i32 52, i32 2, i32 50, i32 85, i32 39,
	i32 92, i32 69, i32 113, i32 84, i32 1, i32 87, i32 67, i32 55,
	i32 77, i32 138, i32 63, i32 139, i32 143, i32 20, i32 87, i32 102,
	i32 24, i32 22, i32 120, i32 80, i32 130, i32 90, i32 76, i32 114,
	i32 109, i32 122, i32 125, i32 14, i32 76, i32 142, i32 132, i32 1,
	i32 57, i32 50, i32 37, i32 74, i32 104, i32 115, i32 100, i32 67,
	i32 54, i32 25, i32 114, i32 123, i32 31, i32 127, i32 72, i32 94,
	i32 121, i32 56, i32 140, i32 101, i32 15, i32 41, i32 66, i32 134,
	i32 98, i32 3, i32 46, i32 124, i32 65, i32 94, i32 129, i32 96,
	i32 136, i32 100, i32 57, i32 5, i32 41, i32 88, i32 111, i32 51,
	i32 4, i32 125, i32 140, i32 92, i32 86, i32 35, i32 50, i32 126,
	i32 99, i32 74, i32 68, i32 3, i32 103, i32 105, i32 9, i32 57,
	i32 124, i32 18, i32 54, i32 49, i32 68, i32 49, i32 78, i32 52,
	i32 2, i32 28, i32 18, i32 44, i32 14, i32 96, i32 11, i32 111,
	i32 43, i32 39, i32 82, i32 126, i32 17, i32 27, i32 71, i32 45,
	i32 7, i32 38, i32 97, i32 25, i32 4, i32 36, i32 17, i32 119,
	i32 95, i32 120, i32 98, i32 84, i32 40, i32 73, i32 58, i32 137,
	i32 33, i32 62, i32 64, i32 104, i32 29, i32 32, i32 33, i32 39,
	i32 133, i32 106, i32 53, i32 88, i32 139, i32 96, i32 123, i32 76,
	i32 101, i32 9, i32 68, i32 134, i32 91, i32 60, i32 77, i32 10,
	i32 23, i32 56, i32 22, i32 21, i32 56, i32 102, i32 34, i32 107,
	i32 74, i32 51, i32 69, i32 130, i32 110, i32 1, i32 60, i32 17,
	i32 107, i32 6, i32 13, i32 54, i32 98, i32 91, i32 109, i32 37,
	i32 79, i32 16, i32 61, i32 40, i32 19, i32 77, i32 73, i32 128,
	i32 86, i32 80, i32 108, i32 138, i32 16, i32 43, i32 37, i32 100,
	i32 119, i32 128, i32 82, i32 70, i32 72, i32 12, i32 36, i32 47,
	i32 122, i32 112, i32 42, i32 5, i32 109, i32 126, i32 73, i32 23,
	i32 132, i32 19, i32 135, i32 97, i32 117, i32 141, i32 120, i32 60,
	i32 75, i32 26, i32 131, i32 3, i32 64, i32 10, i32 0, i32 108,
	i32 47, i32 103, i32 26, i32 140, i32 45, i32 22, i32 15, i32 95,
	i32 118, i32 58, i32 112, i32 85, i32 63, i32 0, i32 99, i32 110,
	i32 59, i32 61, i32 15, i32 85, i32 75, i32 97, i32 116, i32 78,
	i32 122, i32 121, i32 135, i32 94, i32 35, i32 28, i32 20, i32 23,
	i32 34, i32 131, i32 88, i32 89, i32 32, i32 116, i32 83, i32 101,
	i32 72, i32 44, i32 124, i32 63, i32 121, i32 46, i32 14, i32 42,
	i32 75, i32 82, i32 83, i32 40, i32 47, i32 41, i32 93, i32 30,
	i32 30, i32 110, i32 46, i32 127, i32 129, i32 32, i32 11, i32 62,
	i32 59, i32 66, i32 108, i32 125, i32 117, i32 116, i32 13, i32 21,
	i32 12, i32 7, i32 143, i32 104, i32 59, i32 118, i32 111, i32 79,
	i32 65, i32 53, i32 61, i32 6, i32 113, i32 51, i32 105, i32 19,
	i32 86, i32 137, i32 107, i32 90, i32 66, i32 4, i32 119, i32 31,
	i32 29, i32 81, i32 135, i32 10, i32 48, i32 117, i32 0, i32 133,
	i32 55, i32 112, i32 78, i32 70, i32 123, i32 71, i32 35, i32 28
], align 16

@marshal_methods_number_of_classes = dso_local local_unnamed_addr constant i32 0, align 4

@marshal_methods_class_cache = dso_local local_unnamed_addr global [0 x %struct.MarshalMethodsManagedClass] zeroinitializer, align 8

; Names of classes in which marshal methods reside
@mm_class_names = dso_local local_unnamed_addr constant [0 x ptr] zeroinitializer, align 8

@mm_method_names = dso_local local_unnamed_addr constant [1 x %struct.MarshalMethodName] [
	%struct.MarshalMethodName {
		i64 u0x0000000000000000, ; name: 
		ptr @.MarshalMethodName.0_name; char* name
	} ; 0
], align 8

; get_function_pointer (uint32_t mono_image_index, uint32_t class_index, uint32_t method_token, void*& target_ptr)
@get_function_pointer = internal dso_local unnamed_addr global ptr null, align 8

; Functions

; Function attributes: memory(write, argmem: none, inaccessiblemem: none) "min-legal-vector-width"="0" mustprogress nofree norecurse nosync "no-trapping-math"="true" nounwind "stack-protector-buffer-size"="8" uwtable willreturn
define void @xamarin_app_init(ptr nocapture noundef readnone %env, ptr noundef %fn) local_unnamed_addr #0
{
	%fnIsNull = icmp eq ptr %fn, null
	br i1 %fnIsNull, label %1, label %2

1: ; preds = %0
	%putsResult = call noundef i32 @puts(ptr @.str.0)
	call void @abort()
	unreachable 

2: ; preds = %1, %0
	store ptr %fn, ptr @get_function_pointer, align 8, !tbaa !3
	ret void
}

; Strings
@.str.0 = private unnamed_addr constant [40 x i8] c"get_function_pointer MUST be specified\0A\00", align 16

;MarshalMethodName
@.MarshalMethodName.0_name = private unnamed_addr constant [1 x i8] c"\00", align 1

; External functions

; Function attributes: noreturn "no-trapping-math"="true" nounwind "stack-protector-buffer-size"="8"
declare void @abort() local_unnamed_addr #2

; Function attributes: nofree nounwind
declare noundef i32 @puts(ptr noundef) local_unnamed_addr #1
attributes #0 = { memory(write, argmem: none, inaccessiblemem: none) "min-legal-vector-width"="0" mustprogress nofree norecurse nosync "no-trapping-math"="true" nounwind "stack-protector-buffer-size"="8" "target-cpu"="x86-64" "target-features"="+crc32,+cx16,+cx8,+fxsr,+mmx,+popcnt,+sse,+sse2,+sse3,+sse4.1,+sse4.2,+ssse3,+x87" "tune-cpu"="generic" uwtable willreturn }
attributes #1 = { nofree nounwind }
attributes #2 = { noreturn "no-trapping-math"="true" nounwind "stack-protector-buffer-size"="8" "target-cpu"="x86-64" "target-features"="+crc32,+cx16,+cx8,+fxsr,+mmx,+popcnt,+sse,+sse2,+sse3,+sse4.1,+sse4.2,+ssse3,+x87" "tune-cpu"="generic" }

; Metadata
!llvm.module.flags = !{!0, !1}
!0 = !{i32 1, !"wchar_size", i32 4}
!1 = !{i32 7, !"PIC Level", i32 2}
!llvm.ident = !{!2}
!2 = !{!".NET for Android remotes/origin/release/9.0.1xx @ 9abff7703206541fdb83ffa80fe2c2753ad1997b"}
!3 = !{!4, !4, i64 0}
!4 = !{!"any pointer", !5, i64 0}
!5 = !{!"omnipotent char", !6, i64 0}
!6 = !{!"Simple C++ TBAA"}
